const express = require("express"); //import express library
const eventsRoutings = express.Router(); //eventsRoutings Router object
const mongoose = require("mongoose"); //import mongoose
require("./../Models/eventsModel"); //import speakers Schema
const path = require("path"); //import path lib

// compile our model
let events = mongoose.model("events");
let peakers = mongoose.model("speakers");

eventsRoutings.get("/list", (request, response) => {
    // if (request.session.role) {
    peakers
        .find({})
        .then(data => {
            response.locals.Allspeakers = data;
        })
        .catch(error => {
            response.render("error/index.ejs");
        });

    // if (request.session.role == "admin") {
    events
        .find({})
        .populate({ path: "mainSpeaker otherSpeakers" })
        .then(data => {
            response.send(data);
        })
        .catch(error => {
            response.send(error);
        });
}); //list ==> get

eventsRoutings.post("/add", (request, response) => {
    let addNewEvent = new events(request.body); //get body http request
    console.log(addNewEvent);
    addNewEvent
        .save()
        .then(data => {
            response.send("Done");
        })
        .catch(error => {
            response.send("error");
        });
}); //add ==> post

eventsRoutings.post("/update", (request, response) => {
    let updateEvent = request.body; //get body http request
    console.log(updateEvent);
    events
        .update({ _id: updateEvent._id }, { $set: updateEvent })
        .then(data => {
            response.send(data);
        })
        .catch(error => {
            response.send(error);
        });
}); //update ==> post

eventsRoutings.post("/delete", (request, response) => {
    console.log(request.body);
    events
        .remove({ _id: request.body._id })
        .then(data => {
            //response.redirect("/events/list");
            response.send("OK");
        })
        .catch(error => {
            response.render("error/index.ejs");
        });
}); //delete ==> get

module.exports = eventsRoutings;
