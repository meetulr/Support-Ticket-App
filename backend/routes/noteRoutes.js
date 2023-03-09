const express = require("express");
const router = express.Router({mergeParams: true});
const noteRoutes = require("../controllers/noteController");

const {protect} = require("../middleware/authMiddleware");

router.route("/")
    .get(protect, noteRoutes.getNotes)
    .post(protect, noteRoutes.addNote);


module.exports = router;