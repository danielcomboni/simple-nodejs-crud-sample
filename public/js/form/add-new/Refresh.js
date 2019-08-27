/**
 * @author Daniel Comboni
 */

// require sweetalert to show popup messages
const swal = require("sweetalert");

/**
 * refreshes the table
 */
const refreshTable = () => {
  window.location = "/";
};

// export the refreshTable()
module.exports = {
  refreshTable
};
