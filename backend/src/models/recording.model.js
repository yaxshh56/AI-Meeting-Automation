import mongoose from "mongoose";

const recordingSchema =
new mongoose.Schema({

    meetingCode:{
        type:String
    },

    title:{
        type:String
    },

    recordingUrl:{
        type:String
    },

    createdAt:{
        type:Date,
        default:Date.now
    }

});

export const Recording =
mongoose.model(
    "Recording",
    recordingSchema
);