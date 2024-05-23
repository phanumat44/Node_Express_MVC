const express = require("express");
const router = express.Router();

const { Register, Login, Readall, Readone, Update, Remove } = require("../Controllers/auth");

router.post("/register", Register);
router.post("/login", Login);
router.put("/users/:id", Update);
router.delete("/users/:id", Remove);
router.get("/users", Readall);
router.get("/users/:id", Readone);

module.exports = router;