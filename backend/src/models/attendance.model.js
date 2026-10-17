import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    meetingCode: {
        type: String,
        required: true
    },

    joinTime: {
        type: Date,
        required: true
    },

    leaveTime: {
        type: Date,
        required: true
    },

    durationMinutes: {
        type: Number,
        required: true
    }
});

export const Attendance =
mongoose.model(
    "MeetingAttendance",
    attendanceSchema
);