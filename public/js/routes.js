/**
 * @author Daniel Comboni
 *
 * Class that carries all routes
 */

const dbUtils = require("./DBUtils");

const dbUtilsStatic = dbUtils.DBUtilsStatic;

// const app = dbUtilsStatic.getApp();

const startApp = require("./startApp.js");

class Routes {
  static rootPath() {
    console.log(__dirname);
  }

  static rootPage(theRoute, app, htmlName) {
      console.log('inside root path...');
      console.log('the app', app);
      console.log('path: ', __dirname);
      console.log('move: ', '../../public/ui/');
    // app = startApp.StartAppStatic.getApp();
    app.get(theRoute, (req, res) => {
        console.log('the path itself', htmlName);
      res.sendFile('../../public/ui/crud.html');
    });

    // return __dirname + "/public/ui/crud_test.html";
  }

  static doAPost(thePostRoute, testBody, app) {
    app.post(thePostRoute, (req, res) => {
      console.log("inside post.....................");
      let data = {
        // product_name: req.body.product_name,
        // product_price: req.body.product_price
        product_name: testBody.product_name,
        product_price: testBody.product_price
      };
      console.log("test", testBody);
      let sql = "insert into product set ?";
      let query = dbUtilsStatic
        .getConnection()
        .query(sql, data, (err, results) => {
          if (err) throw err;
          console.log("redirecting...");
          // res.redirect('/');
        });
    });
  }
}

const routeStatic = Routes;

module.exports = {
  routeStatic
};
