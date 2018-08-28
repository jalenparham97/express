"use strict"; 

// Requiring express so we can use express
const express = require("express");
// Using an express methed that lets us create routes
const clothes = express.Router();
// Making the id count zero because 
let idCount = 0;

// This array holds objects of clothes that will be pushed in it
const clothesList = [
    {
      brand: "Gucci",
      type: "pants",
      size: 6,
      color: "Black",
      price: 200,
      id: idCount
    }
]; 


// This function just gets the clothesList array and sends it as a repsponse
clothes.get("/clothes", (req, res) => {
    res.send(clothesList);
});
// This function adds a new object to the array and gives it an id number
clothes.post("/clothes", (req, res) => {
    idCount++;
    clothesList.push({
      brand: req.body.brand,
      type: req.body.type,
      size: req.body.size,
      color: req.body.color,
      price: req.body.price,
      id: idCount
    })
    res.send(clothesList);
});
// This function deletes an object from the array
clothes.delete("/clothes/:id", (req, res) => {
    let count = 0; // setting a count variable to equal 0
    console.log(req.params.id); 
    // Looping over the clothesList array
    for(let clothes of clothesList) {
      // If the object id is equal to the request id then splice out that object from the array
      if(clothes.id == req.params.id) {
        clothesList.splice(count, 1);
      }
      // For each tiime the loop runs increase count by 1
      count++;
    }
    res.send(clothesList);
});
// This function simply updates an object in the array
clothes.put("/clothes/:id", (req, res) => {
    let count = 0;
    // Looping over the clothesList array
    for (let clothes of clothesList) {
        // If the object id is equal to the request id then splice out that object and replace it with the new object
        if (clothes.id == req.params.id) {
            clothesList.splice(count, 1, req.body)
        }
        // For each tiime the loop runs increase count by 1
        count ++
    }
    res.send(clothesList);
});
// Exporting the clothes file
module.exports = clothes;