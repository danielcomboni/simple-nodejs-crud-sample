/**
 * @author Daniel Comboni
 */

// require the starting pooint of the application
const startOff = require("./public/js/startApp");

// rewuire the database utilities provider
const dbutils = require("./public/js/DBUtils");

// get the static instance of the starting point
const StartApp = startOff.StartAppStatic;

// get the express Route
const router = StartApp.getExpress().Router();

// instantiate the application to start off
const app = StartApp.getApp();

// provide an alias to the static files
app.use("/resources", StartApp.getExpress().static(__dirname + "/public"));

// specify the view engine
app.set("view engine", "hbs");

/**
 * the root route with a GET HTTP method
 *
 * retrieves all the data from the product table
 */
app.get("/", (req, res) => {
  // get all the data from the database
  dbutils.DBUtilsStatic.getConnection().query(
    "select * from product",
    (error, results) => {
      if (error) throw error;
      // render the data to view
      res.render("product", {
        results: results
      });
      // close the connection to the database
      dbutils.DBUtilsStatic.getConnection().end();
    }
  );
});

/**
 * the save route / url / end point
 *
 * it has HTTP method of POST
 *
 * saves the product object to the database table
 */
app.post("/save", (req, res) => {
  // get the product object from the form
  let data = {
    product_name: req.body.product_name,
    product_price: req.body.product_price
  };

  // specify the insert command
  let sql = "INSERT INTO product (product_name,product_price) values(?,?)";

  // execute the insert command
  let query = dbutils.DBUtilsStatic.getConnection().query(
    sql,
    [data.product_name, data.product_price],
    (err, results) => {
      if (err) throw err;
      // close connection to the database
      dbutils.DBUtilsStatic.getConnection().end();
    }
  );
});

/**
 * update route
 * utilizes the PUT HTTP method to makes changes to a given row in the product table
 */
app.put("/update", (req, res) => {
  // declare and initialize connection and specify the UPDATE command or query
  let query = dbutils.DBUtilsStatic.getConnection().query(
    "update product set product_name=?, product_price=? where id=?",
    [req.body.product_name, req.body.product_price, req.body.id],
    (err, results) => {
      if (err) throw err;
      // clos connection to the database
      dbutils.DBUtilsStatic.getConnection().end();
    }
  );
});

/**
 * utilizes he DELETE HTTP method
 *
 * deletes a row from the table basing on the id (param) specified
 */
app.delete("/delete/:id", (req, res) => {
  // the delete command / query
  let sql = "DELETE FROM product WHERE id=?";
  // execute the delete command
  let query = dbutils.DBUtilsStatic.getConnection().query(
    sql,
    [req.params.id],
    (err, results) => {
      if (err) throw err;
      // cose connection to the database
      dbutils.DBUtilsStatic.getConnection().end();
    }
  );
});

router.use((req, res, next) => {
  console.log("method", "/", req.method);
  next();
});

// specify the port of the app
app.listen("2000");
