/**

@author Daniel Comboni

This class holds the necessary utilities to access the database

*/

/**
requiring mysql
*/
const mysql = require("mysql");
/**
requiring body parser
*/
const bodyParser = require("body-parser");

/**
the DBUtils class handles most of the necessary database access tools
*/

class DBUtils {
  constructor() {}

  static htmlDir() {
    return "./public";
  }

  static getBodyParser() {
    return bodyParser.json();
  }

  /** get connection to the database*/
  static getDBCredentials() {
    return mysql.createConnection({
      host: "localhost",
      user: "root",
      database: "crud_db",
      password: "mysql"
    });
  }

  static getConnection(err) {
    return DBUtils.getDBCredentials();
  }

  static getResultSet(sqlQuery, render) {
    let result;
    DBUtils.getConnection().query(sqlQuery, (err, rows) => {
      if (rows === undefined) {
      } else {
        // console.log(rows);
        result = rows;
      }
    });
    DBUtils.getConnection().end();
    return result;
  }

  /**
   *This finally inserts into the database
   *
   * the final INSERT command
   * @param {String} sqlQuery
   *
   * the map of column name to their values
   * @param {*} mapOfColumnsToValues
   */
  static theInsert(sqlQuery, mapOfColumnsToValues) {
    // an array to hold the values to be inserted into the table
    let values = [];

    // pushing values to the array
    for (let [key, value] of mapOfColumnsToValues) {
      values.push(value);
    }

    // then finally insert
    DBUtils.getConnection().query(sqlQuery, values);

    DBUtils.getConnection().end();
  }

  /**
   * creates an INSERT INTO TABLE_NAME command
   *
   *  this is the truncated SQL command "INSERT INTO TABLE (col1, col2...)" without specifying values
   *
   * @param {String} sqlQuery
   * @param {Object} theBody
   */
  static insert(sqlQuery, theBody) {
    // map to hold column names as key mapped to their values
    let columnValueMap = new Map();

    // setting the map key pair value
    for (let [key, value] of Object.entries(theBody)) {
      columnValueMap.set(key.trim(), value);
    }

    // add command values and opening brace "(" to the INSERT command
    sqlQuery = sqlQuery.concat(" values").concat("(");

    // add all the necessary value placeholders / wildcards "?"
    for (let i = 0; i < columnValueMap.size; i++) {
      sqlQuery = sqlQuery.concat("?,");
    }

    // slice the command to remove the last comma "," and add the final closing brace ")"
    sqlQuery = sqlQuery.slice(0, sqlQuery.length - 1).concat(")");

    console.log("\n" + sqlQuery + "\n");

    // finally insert into the database
    DBUtils.theInsert(sqlQuery, columnValueMap);
  }
}
const DBUtilsStatic = DBUtils;
module.exports = {
  DBUtilsStatic
};
