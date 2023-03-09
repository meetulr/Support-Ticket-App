const express = require("express");
const router = express.Router();
const ticketRoutes = require("../controllers/ticketController");
const { protect } = require("../middleware/authMiddleware");

router.route("/")
    .get(protect, ticketRoutes.getTickets)
    .post(protect, ticketRoutes.createTicket);

router.route("/:id")
    .get(protect, ticketRoutes.getTicket)
    .put(protect, ticketRoutes.updateTicket)
    .delete(protect, ticketRoutes.deleteTicket)

module.exports = router;