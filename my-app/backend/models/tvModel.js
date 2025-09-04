const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  ticketNumber: {
    type: Number,
  },
  name: {
    type: String,
  },
});

const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;
