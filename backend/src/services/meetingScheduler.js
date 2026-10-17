import {
    addAIParticipant
}
from "../controllers/socketManager.js";

import { Schedule }
from "../models/schedule.model.js";

export const startMeetingScheduler =
() => {

    setInterval(
        async () => {

            console.log(
                "Checking scheduled meetings..."
            );

            const schedules =
            await Schedule.find({
                autoAttend:true,
                hostJoined:false,
                aiJoined:false
            });

            const now =
            new Date();

            schedules.forEach(
                async(schedule)=>{

                    const meetingDateTime =
                    new Date(
                        `${schedule.date}T${schedule.time}:00`
                    );

                    if(
                        now >= meetingDateTime
                    ){

                        console.log(
                            "AI SHOULD JOIN:",
                            schedule.meetingCode
                        );

                       schedule.aiJoined = true;

await schedule.save();

addAIParticipant(
    schedule.meetingCode
);
                    }

                }
            );

        },

        60000
    );

};