require("dotenv").config();
const mongoose = require("mongoose");
const initMongo = require("../config/mongo");

initMongo();

//models
let Products = require("../models/Products");

(async () => {
  console.log("los productos: ", await Products.find({}));
})();
