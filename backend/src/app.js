import recordingRoutes
from "./routes/recording.routes.js";

import summaryRoutes
from "./routes/summary.routes.js";

import {
    sendReminderEmail
}
from "./services/email.service.js";

import { User }
from "./models/user.model.js";

import { Schedule } from "./models/schedule.model.js";

import { checkMeetingReminders }
from "./controllers/reminder.controller.js";

import {
    startMeetingScheduler
}
from "./services/meetingScheduler.js";

import scheduleRoutes
from "./routes/schedule.routes.js";

import express from "express";
import { createServer } from "node:http";

import { Server } from "socket.io";

import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";

import cors from "cors";
import userRoutes from "./routes/users.routes.js";
import attendanceRoutes from "./routes/attendance.routes.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);


app.set("port", (process.env.PORT || 8000))
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/attendance", attendanceRoutes);
app.use("/api/v1/schedules",scheduleRoutes);
app.use("/api/v1/summaries",summaryRoutes);
app.use("/api/v1/recordings",recordingRoutes);
const start = async () => {
    app.set("mongo_user")
    const connectionDb = await mongoose.connect("mongodb+srv://imdigitalashish:imdigitalashish@cluster0.cujabk4.mongodb.net/")

    console.log(`MONGO Connected DB HOst: ${connectionDb.connection.host}`)
    server.listen(app.get("port"), () => {

    console.log(
        "LISTENIN ON PORT 8000"
    );

    startMeetingScheduler();

});



}
setInterval(async () => {

    console.log(
        "Checking reminders..."
    );

    await checkMeetingReminders();

}, 60000);

app.get("/all-users", async (req,res)=>{

    const users =
    await User.find();

    res.json(users);

});

app.get(
    "/test-email",
    async (req,res)=>{

        try{

            await sendReminderEmail(
                "yashpote65@gmail.com",
                "Project Review Meeting",
                "test123",
                "2026-06-25",
                "17:30"
            );

            res.send(
                "Email Sent Successfully"
            );

        }
        catch(error){

            console.log(error);

            res.send(
                "Email Failed"
            );

        }

    }
);
start();

startMeetingScheduler();