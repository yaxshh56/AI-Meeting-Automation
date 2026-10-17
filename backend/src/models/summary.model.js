import mongoose from "mongoose";

const summarySchema =
new mongoose.Schema({

    meetingCode: String,

    notes: String,

    summary: String,

    createdAt: {
        type: Date,
        default: Date.now
    }

});

export const Summary =
mongoose.model(
    "Summary",
    summarySchema
);