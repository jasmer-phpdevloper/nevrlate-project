const mongoose = require("mongoose");
const Schema = mongoose.Schema

const MeetingSchema = new mongoose.Schema({
    // organizerId: {
    //     type: Schema.Types.ObjectId,
    //     ref: "user",
    //     required: true
    // },
    title: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    importance: {
        type: Number,
        trim: true,
    },
    duration: {
        type: Number,
        trim: true,
    },
    startTime: {
        type: Date,
        trim: true,
    },
    meetingUrl: {
        type: String,
        trim: true,
    },
    meetingPlatform: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        trim: true,
    },
    meetingId: {
        type: Number,
        trim: true,
    },
    meetingPassword: {
        type: String,
        trim: true,
    },
    attendees: {
        type:Array,
        required:true
    },
   
}, { timestamps: true });

module.exports = mongoose.model("Meeting", MeetingSchema);