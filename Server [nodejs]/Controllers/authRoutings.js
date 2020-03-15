const express = require("express"); //import express library
const authRoutings = express.Router(); //authRoutings Router object
const path = require("path"); //import path lib
const mongoose = require("mongoose"); //import mongoose
require("./../Models/spreakersModel"); //import speakers Schema
let users = mongoose.model("speakers"); //import users database
const multer = require("multer"); //upload images

// settings
let date = new Date();
let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, "..", "public", "profiles"));
    },
    filename: function(req, file, cb) {
        cb(
            null,
            file.fieldname +
                "-" +
                date.getFullYear() +
                "" +
                date.getMonth() +
                date.getDay() +
                date.getHours() +
                date.getMinutes() +
                ".jpg"
        );
    }
});

let upload = multer({ storage: storage });

/* ==========  Start encrypt and decrypt settings using crypto lib */
const crypto = require("crypto");

function encrypt(pass) {
    let mykey = crypto.createCipher("aes-128-cbc", "mypassword");
    let encryptedPass = mykey.update(pass, "utf8", "hex");
    encryptedPass += mykey.final("hex");
    return encryptedPass;
}

function decrypt(pass) {
    let mykey = crypto.createDecipher("aes-128-cbc", "mypassword");
    let originalPass = mykey.update(pass, "hex", "utf8");
    originalPass += mykey.final("utf8");
    return originalPass;
}
/* ==========  Start encrypt and decrypt settings using crypto lib */

let reply_role, reply_id;

authRoutings.get("/session", (request, response) => {
    response.send({ role: reply_role, id: reply_id });
});

authRoutings.post("/login", (request, response) => {
    //get body http request
    let userData = request.body;
    //Check userData is admin or speaker
    switch (userData.userName) {
        case "admin":
            if (userData.password == "123") {
                request.session.role = "admin";
                reply_role = "admin";
                reply_id = 0;
                response.send("ok");
            } else {
                response.send("error");
            }
            break;

        default:
            users
                .find({ userName: userData.userName })
                .then(data => {
                    //check user existance
                    if (data.length == 0) {
                        request.flash(
                            "notExist",
                            "User is not exist, please Register first"
                        );
                        response.send("error");
                    } else if (userData.password != decrypt(data[0].password)) {
                        request.flash(
                            "passNotCorrect",
                            "Password is not correct, try again"
                        );
                        response.send("error");
                    } else {
                        request.session.role = "speaker";
                        // request.session.user_name = data[0].userName;
                        // request.session._id = data[0]._id;
                        reply_role = "speaker";
                        reply_id = data[0]._id;
                        response.send("speaker");
                    }
                })
                .catch(error => {
                    request.flash(
                        "dataBaseError",
                        "Server is fixed right now, Please Try again later"
                    );
                    response.send("error");
                });
            break;
    }
}); // login ==> post

authRoutings.post("/register", upload.single("image"), (request, response) => {
    let addNewSpeaker = new users(request.body); //get body http request
    addNewSpeaker.password = encrypt(addNewSpeaker.password);
    addNewSpeaker.image =
        "image-" +
        date.getFullYear() +
        "" +
        date.getMonth() +
        date.getDay() +
        date.getHours() +
        date.getMinutes() +
        ".jpg";
    console.log(addNewSpeaker);
    addNewSpeaker
        .save()
        .then(data => {
            response.send("ok");
        })
        .catch(error => {
            response.send("error");
        });
}); //add ==> post

authRoutings.get("/logout", (request, response) => {
    reply_id = null;
    reply_role = null;
    request.session.destroy(err => {
        if (err) {
            response.send("error");
        }
        response.send("ok");
    });
}); //logout ==> get

module.exports = authRoutings;
