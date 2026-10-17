import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    meetingCode: {
        type: String,
        required: true
    },

    date: {
        type: String,
        required: true
    },

    time: {
        type: String,
        required: true
    },

    autoAttend: {
        type: Boolean,
        default: true
    },

    createdBy: {
        type: String,
        required: true
    },

    hostJoined: {
        type: Boolean,
        default: false
    },

    aiJoined: {
        type: Boolean,
        default: false
    },

    reminder15Sent: {
        type: Boolean,
        default: false
    },

    reminder5Sent: {
    type: Boolean,
    default: false
    },

    meetingStartedReminder: {
    type: Boolean,
    default: false
     },
    
    

});

export const Schedule =
mongoose.model(
    "Schedule",
    scheduleSchema
);