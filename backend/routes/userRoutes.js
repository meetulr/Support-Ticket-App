const express = require("express");
const router = express.Router();
const userRoutes = require("../controllers/userController");
const {protect} = require("../middleware/authMiddleware");

router.post("/", userRoutes.registerUser);

router.post("/login", userRoutes.loginUser);

router.get("/me", protect, userRoutes.getMe);

module.exports = router;