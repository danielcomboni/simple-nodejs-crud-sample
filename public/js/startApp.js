/**

@author Daniel Comboni

This class holds the necessary utilities to access the database

*/

/*
requiring express
*/
const express = require("express");

/**
requiring morgan
*/
const morgan = require("morgan");

/**
requiring mysql
*/
const mysql = require("mysql");

/**requiring hbs */
// const hbs = require("hbs");

/**
requiring body parser
*/
const bodyParser = require("body-parser");

/** requiring path */
const path = require("path");

/**
 *
 */
class StartApp {
  /**
   * returns the express contructor / objct from instantiation
   */
  static getExpress() {
    return express;
  }

  /** get the app to start off*/
  static getApp() {
    //  a message to show that the app is up and running
    console.log("the app is up and running...");

    // instantiating express
    const theApp = express();

    // use morgan
    theApp.use(morgan("short"));

    // set public folder as static folder
    theApp.set("alias", express.static(__dirname + "../../public"));
    theApp.use(express.static("./public"));

    // using body parser to get the values and parse themm into JSON format
    theApp.use(bodyParser.json());

    return theApp;
  }
}

//  creating a static instance of the class
const StartAppStatic = StartApp;

// exporting the static instance of the class
module.exports = {
  StartAppStatic
};
