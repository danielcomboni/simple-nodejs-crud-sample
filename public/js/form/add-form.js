/**
 * @author Daniel Comboni
 */

// require module to add new product
const addNewProduct = require("./add-new/AddNewProduct");

// require module to edit product details
const edit = require("../form/add-new/Edit");

/**
 * adds new product to the database table
 */
const submit = () => {
  // get the form whose input values are to be captured
  const form = document.getElementById("the-form");
  // add a listener to the form upon submitting the values
  form.addEventListener("submit", e => {
    //prevent default action
    e.preventDefault();
    // invoke the addNewProduct() from  AddNewProduct module
    addNewProduct.addNewProduct();
    // invoke the refreshTable() from the AddNewProduct module
    addNewProduct.refreshTable();
  });
};

// invoking the submit function to add a new product to the database table
submit();

/**
 * refresh the table data in view/html
 */
const refresh = () => {
  // get the button to refresh the table data
  const refreshBtn = document.getElementById("refresh");
  // add a listener to the button
  refreshBtn.addEventListener("click", e => {
    // invoke the refreshTable() from the AddNewProduct module
    addNewProduct.refreshTable();
  });
};

// invoke the refresh()
refresh();

edit.getTableData();

/**
 * edits the product details /UPDATE operation
 */
const editProduct = () => {
  // get the form to be pre-populated
  const editForm = document.getElementById("form-edit");
  // add a listener to the form upon submitting
  editForm.addEventListener("submit", e => {
    // prevent default action
    e.preventDefault();
    // invoke the editProductFinal() from the Edit module
    edit.editProductFinal();
  });
};

// invoke the editProduct()
editProduct();

/**
 * deletes a product from the database table
 */
const deleteAProduct = () => {
  // declare id of the product row/tuple to be deleted
  let ID;
  // get the values of the row clicked on the table (delete button clicked)
  $("#mytable").on("click", ".delete", function() {
    // get the id of the row (product)
    const product_id = $(this).data("id");

    ID = product_id;

    // send a message to warn the user if they are sure about deleting the product
    swal({
      title: "Are you sure?",
      icon: "warning",
      dangerMode: true,
      buttons: {
        cancel: true,
        confirm: "Confirm"
      }
    }).then(e => {
      // check if the user agreed to delete
      if (e === true) {
        // finally delete
        edit.deleteFinal(ID);
      }
    });
  });
};

// invoke the deleteProduct()
deleteAProduct();
