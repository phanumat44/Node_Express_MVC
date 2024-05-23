const express = require("express");
const router = express.Router();

const { Readone, Readall, Create, Update, Remove } = require("../Controllers/product");

const { authen } = require("../Middleware/auth");

//get all products
router.get("/products", authen, Readall);

//get one product
router.get("/products/:id", authen, Readone);

//create a product
router.post("/products", authen, Create);

//update a product
router.put("/products/:id", authen, Update);

//delete a product
router.delete("/products/:id", authen, Remove);



module.exports = router;