const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");
const Note = require("../models/noteModel");

// @desc Get notes for a ticket
// @route GET /api/tickets/:ticketId/notes
// @access Private
const getNotes = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error("User not found");
    }

    const ticket = await Ticket.findById(req.params.ticketId);

    if(ticket.user.toString() !== req.user.id){
        res.status(401);
        throw new Error("Not Authorized");
    }

    const notes = await Note.find({ticket: req.params.ticketId})

    res.status(200).json(notes);
})

// @desc create ticket note
// @route POST /api/tickets/:ticketId/notes
// @access Private
const addNote = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error("User not found");
    }

    const ticket = await Ticket.findById(req.params.ticketId);

    if(ticket.user.toString() !== req.user.id){
        res.status(401);
        throw new Error("Not Authorized");
    }

    const note = await Note.create({
        ticket: req.params.ticketId,
        user: req.user.id,
        text: req.body.text,
        isStaff:false
    })

    res.status(200).json(note);
})

module.exports = {
    getNotes,
    addNote
}