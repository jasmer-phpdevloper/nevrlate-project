const mongoose = require("mongoose");
const Schema = mongoose.Schema

const InviteSchema = new mongoose.Schema({
    
    email: {
        type: String,
        trim: true,
        
    },
    status: {
        type: String,
        trim: true,
    },
    user_id: {
        type: String,
        trim: true,
    },
    
   
}, { timestamps: true });

module.exports = mongoose.model("InviteUser", InviteSchema);