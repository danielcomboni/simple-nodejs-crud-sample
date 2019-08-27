/**
 * @author Daniel Comboni
 */

// require a sweetalert to help show message of success or failure
const swal = require("sweetalert");

// require the Refresh.js file for refreshing the table
const refresh = require("./Refresh");

/**
 * gets the value of the element whose id is passed has an argument
 * @param {String} id
 */
const getValue = id => $("#" + id).val();

/**
 * simple function to refresh the table
 */
const refreshTable = () => {
  refresh.refreshTable();
};

/**
 * adds new product to the table
 */
const addNewProduct = () => {
  // get the product name
  const name = getValue("product_name");

  // get the product price
  const price = getValue("product_price");

  // an object of the product
  let data = {
    product_name: name,
    product_price: price
  };

  // ajax expression to save the new product
  $.ajax({
    url: "/save",
    type: "POST",
    data: JSON.stringify(data),
    contentType: "application/json",
    dataType: "json",
    success: (data, textStatus, xhr) => {},
    complete: (xhr, textStatus) => {
      // checking if the status code id "OK"
      if (xhr.status === 200) {
        // show a success message on screen
        swal({
          title: "success",
          icon: "success",
          text: "product: " + name + "\nprice: " + price,
          closeOnClickOutside: false
        });
      }
      // otherwise, show a failure message
      else {
        swal({
          title: "Error",
          icon: "error",
          text: "something was not rigth",
          closeOnClickOutside: false
        });
      }
    }
  });
};

/**
 * exporting the functions to be used by other modules as required
 */
module.exports = {
  addNewProduct,
  refreshTable
};
