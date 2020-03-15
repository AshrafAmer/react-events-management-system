const mongoose = require("mongoose"); //import mongoose

// Events Schema
const eventsModel = new mongoose.Schema({
    _id: Number,
    title: { type: String, required: true },
    eventDate: Date,
    mainSpeaker: { type: Number, ref: "speakers" },
    otherSpeakers: [{ type: Number, ref: "speakers" }]
});

// mapping
mongoose.model("events", eventsModel);
