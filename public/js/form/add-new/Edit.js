/**
 * @author Daniel Comboni
 */

// require sweetalert
const swal = require("sweetalert");

/**
 * get data to the editing form (popup / modal)
 */
const getTableData = () => {
  //showing data to modal for edit record
  $("#mytable").on("click", ".edit", function() {
    const product_id = $(this).data("id");
    const product_name = $(this).data("product_name");
    const product_price = $(this).data("product_price");
    console.log(product_id, product_name, product_price);
    $("#EditModal").modal("show");
    $("#product_name_edit").val(product_name);
    $("#product_price_edit").val(product_price);
    $("#id_edit").val(product_id);
  });
};

/**
 * update/edit details of a product in a table
 */
const editProductFunc = () => {
  // get new product name
  const name = $("#product_name_edit").val();

  //get new price
  const price = $("#product_price_edit").val();

  // get the id (it won't change)
  const id = $("#id_edit").val();

  // create an object of the new product details
  const data = {
    product_name: name,
    product_price: price,
    id: id
  };

  $.ajax({
    url: "/update",
    type: "PUT",
    data: JSON.stringify(data),
    contentType: "application/json",
    dataType: "json",
    success: (data, textStatus, xhr) => {},
    complete: (xhr, textStatus) => {
      console.log(xhr.status);
      // check if the update was successful
      if (xhr.status === 200) {
        // show a success message
        swal({
          title: "success",
          icon: "success",
          closeOnClickOutside: false
        });
      }
      // otherwise, it failed
      else {
        // show a failure message
        swal({
          title: "Oops!",
          icon: "error",
          text: "something was not rigth",
          closeOnClickOutside: false
        });
      }
    }
  });
};

/**
 * delete a product from the database table
 *
 * the id is placed in the where close as a param to allow deleting
 * a specific row
 * @param {int} id
 */
const deleteFinal = id => {
  $.ajax({
    url: "/delete/" + id,
    type: "DELETE",
    success: (data, textStatus, xhr) => {},
    complete: (xhr, textStatus) => {
      console.log(xhr.status);

      // checking if the deletion was successful
      if (xhr.status === 200) {
        // show a success message
        swal({
          title: "success",
          icon: "success",
          closeOnClickOutside: false
        });
      }
      // otherwise, it failed
      else {
        // show a failure message
        swal({
          title: "Oops!",
          icon: "error",
          text: "something was not rigth",
          closeOnClickOutside: false
        });
      }
    }
  });
};

// invoke the editProductFunc()
const editProductFinal = () => {
  editProductFunc();
};

// export all the functions that will be required by other modules from this module
module.exports = {
  getTableData,
  editProductFinal,
  deleteFinal
};
