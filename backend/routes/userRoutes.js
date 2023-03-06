const express = require("express");
const router = express.Router();
const userRoutes = require("../controllers/userController");


router.post("/", userRoutes.registerUser);

router.post("/login", userRoutes.loginUser);


module.exports = router;