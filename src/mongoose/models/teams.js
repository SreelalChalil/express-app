const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//write the code for  teams collection here, export the code with the name "Teams"
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    name: {
        type : String,
    },
    password: {
        type: String,
    },
    tokens: [{
        token:jwt,
    }]
});

module.exports = mongoose.model('admin', AdminSchema);