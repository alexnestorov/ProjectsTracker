/* globals */
"use strict";
//let mongoose = require("mongoose");
let projectModel = require("../models/project-model");

//config for server.js

module.exports = function(mongoose) {
    mongoose.Promise = global.Promise;
    mongoose.connect("mongodb://localhost/Projects");   
    //mongoose.connect(config.db);

    let db = mongoose.connection;

    db.once("open", (err) => {
        if (err) {
            console.log("Database could not be opened: " + err);            
        }

        console.log("Database up and running...");
    });

    db.on("error", (err) => {
        console.log("Database error: " + err);
    }); 

};
