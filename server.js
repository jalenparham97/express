"use strict";

// These variables are requiring files from the routs we set up
const express = require("express");                           
const app = express();
const shoes = require("./routes/shoes");
const clothes = require("./routes/clothes");
const accessories = require("./routes/accessories");

// Telling express to use this public folder
app.use(express.static("./public"));
// Telling express to convert data to JSON
app.use(express.json());
// Setting our URI's
app.use("/api/shop", shoes);
app.use("/api/shop", clothes);
app.use("/api/shop", accessories);

// Setting a port number
const port = 5000;
// The server is listening for changes on port 5000
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});