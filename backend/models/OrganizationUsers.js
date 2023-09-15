const e = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
 
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  bio: {
    type: String,
  },
  organization_id: {
    type: String,
  },
  organization_name: {
    type: String,
  },
  personal_name: {
    type: String,
  },
 
  userType: {
    type: String,
  },

 
  date: {
    type: Date,
    default: Date.now
  }
});

UserSchema.methods.isValidPass = function (password) {
  // if (oldpassword ===password) return false
  // return true;
}

module.exports = User = mongoose.model("users", UserSchema);