const Ticket = require("../models/tvModel");

exports.getList = async (req, res) => {
  try {
    const Cards = await Ticket.find();
    res.json(Cards);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed fetch Cards" });
  }
};
exports.addList = async (req, res) => {
  try {
    const newCard = new Ticket(req.body);
    const savedCard = await newCard.save();
    res.json(savedCard);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to save Card" });
  }
};
exports.deleteTicket = async (req, res) => {
  try {
    const { _id } = req.body;
    await Ticket.findByIdAndDelete(_id);
    return res.status(200).json({ message: "Ticket deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to save Card" });
  }
};
