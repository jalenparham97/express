"use strict";

const express = require("express");
const accessories = express.Router();
let idCount = 0;


const accessoriesList = [
    // {
    //   brand: "Gucci",
    //   type: "pants",
    //   size: 6,
    //   color: "Black",
    //   price: 200,
    //   id: idCount
    // }
]; 



accessories.get("/accessories", (req, res) => {
    res.send(accessoriesList);
});

accessories.post("/accessories", (req, res) => {
    idCount++;
    accessoriesList.push({
      brand: req.body.brand,
      type: req.body.type,
      color: req.body.color,
      price: req.body.price,
      id: idCount
    })
    res.send(accessoriesList);
});

accessories.delete("/accessories/:id", (req, res) => {
    let count = 0;
    console.log(req.params.id); 
    for(let accessorie of accessoriesList) {
      if(accessorie.id == req.params.id) {
        accessoriesList.splice(count, 1);
      }
      count++;
    }
    res.send(accessoriesList);
});

accessories.put("/accessories/:id", (req, res) => {
    let count = 0;
    for (let accessorie of accessoriesList) {
        if (accessorie.id == req.params.id) {
            accessoriesList.splice(count, 1, req.body)
        }
        count ++
    }
    res.send(accessoriesList);
});

module.exports = accessories;