const mongoose = require("mongoose"); //import mongoose

// Speakers Schema
const speakersModel = new mongoose.Schema({
    _id: Number,
    fullName: String,
    image: { type: String, default: "speaker.png" },
    userName: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    address: { city: String, street: Number, building: Number }
});

// mapping
mongoose.model("speakers", speakersModel);
