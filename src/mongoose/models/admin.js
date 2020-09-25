const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//write the code for  admin collection here, export the code with the name "Admin"

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