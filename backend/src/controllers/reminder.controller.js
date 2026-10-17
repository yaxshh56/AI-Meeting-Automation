import { Recording }
from "../models/recording.model.js";

import { User }
from "../models/user.model.js";

import {
    sendReminderEmail,
    sendSummaryEmail
}
from "../services/email.service.js";

import {
    Schedule
}
from "../models/schedule.model.js";

export const checkMeetingReminders = async () => {

    const meetings = await Schedule.find();

    const now = new Date();

    for (const meeting of meetings) {

        const meetingDateTime = new Date(
            `${meeting.date}T${meeting.time}:00`
        );

        const diffMinutes = Math.floor(
            (meetingDateTime - now) /
            (1000 * 60)
        );
        
        console.log("Meeting:", meeting.meetingCode);
        console.log("Now:", now);
        console.log("Meeting Time:", meetingDateTime);
        console.log("Diff Minutes:", diffMinutes);

        const user = await User.findOne({
            username: meeting.createdBy
        });
        
        console.log(
     "Meeting Created By:",
        meeting.createdBy
        );

    console.log(
    "User Found:",
        user
);  

        // 15 Minute Reminder
        if (
            diffMinutes <= 15 &&
            diffMinutes > 5 &&
            !meeting.reminder15Sent
        ) {

            if (
    user &&
    user.email) {
    await sendReminderEmail(
        user.email,
        meeting.title,
        meeting.meetingCode,
        meeting.date,
        meeting.time
    );
    console.log(
        "Email Sent To:",
        user.email
    );
} else {
    console.log(
        "User Email Not Found:",
        meeting.createdBy
    );
}

            console.log(
                `Reminder: Meeting ${meeting.meetingCode} starts in 15 minutes`
            );

            meeting.reminder15Sent = true;

            await meeting.save();
        }

        // 5 Minute Reminder
        if (
            diffMinutes <= 5 &&
            diffMinutes > 0 &&
            !meeting.reminder5Sent
        ) {

            if (
    user &&
    user.email) {
    await sendReminderEmail(
        user.email,
        meeting.title,
        meeting.meetingCode,
        meeting.date,
        meeting.time
    );
    console.log(
        "Email Sent To:",
        user.email
    );
} else {
    console.log(
        "User Email Not Found:",
        meeting.createdBy
    );
}

            console.log(
                `Reminder: Meeting ${meeting.meetingCode} starts in 5 minutes`
            );

            meeting.reminder5Sent = true;

            await meeting.save();
        }

        // Meeting Started Reminder
        if (
            diffMinutes <= 0 &&
            !meeting.meetingStartedReminder
        ) {

            if (
    user &&
    user.email) {
    await sendReminderEmail(
        user.email,
        meeting.title,
        meeting.meetingCode,
        meeting.date,
        meeting.time
    );
    console.log(
        "Email Sent To:",
        user.email
    );
} else {
    console.log(
        "User Email Not Found:",
        meeting.createdBy
    );
}

            console.log(
                `Meeting Started: ${meeting.meetingCode}`
            );

            meeting.meetingStartedReminder = true;

            await meeting.save();
        }

        if (
            diffMinutes <= -5 &&
            !meeting.hostJoined &&
            !meeting.aiJoined &&
            meeting.autoAttend
        ) {
            console.log(
                "AI SHOULD JOIN:",
                meeting.meetingCode
            );
            meeting.aiJoined = true;

            const notes = "AI attended meeting automatically. Discussed project updates and pending tasks.";
            const summary = "Meeting completed. AI attended because host was absent.";
            await Summary.create({
                meetingCode: meeting.meetingCode,
                notes,
                summary
            });
            await Recording.create({

    meetingCode:
    meeting.meetingCode,

    title:
    meeting.title,

    recordingUrl:
    "https://example.com/recording/" +
    meeting.meetingCode

});
            if(
    user &&
    user.email
){

    await sendSummaryEmail(

        user.email,

        meeting.meetingCode,

        notes,

        summary

    );

    console.log(
        "Summary Email Sent"
    );

}

            await meeting.save();
        }

    }

};