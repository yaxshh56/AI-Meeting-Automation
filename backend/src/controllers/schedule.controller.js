import { Schedule }
from "../models/schedule.model.js";

export const createSchedule =
async (req,res)=>{

    try{

        const schedule =
        await Schedule.create(req.body);

        res.status(201).json(schedule);

    }
    catch(error){

        console.log(error);

        res.status(500).json({
            message:"Error creating schedule"
        });

    }

};

export const getSchedules =
async(req,res)=>{

    try{

        const schedules =
        await Schedule.find()
        .sort({_id:-1});

        res.status(200).json(schedules);

    }
    catch(error){

        console.log(error);

        res.status(500).json({
            message:"Error fetching schedules"
        });

    }

    

};
export const markHostJoined =
async(req,res)=>{

    try{

        const { meetingCode } =
        req.body;

        await Schedule.updateOne(
            { meetingCode },
            { hostJoined:true }
        );

        res.status(200).json({
            message:"Host joined"
        });

    }
    catch(error){

        console.log(error);

        res.status(500).json({
            message:"Error"
        });

    }

};

export const markAIJoined =
async(req,res)=>{

    try{

        const { meetingCode } =
        req.body;

        await Schedule.updateOne(
            { meetingCode },
            {
                aiJoined:true
            }
        );

        res.status(200).json({
            message:"AI Joined"
        });

    }
    catch(error){

        console.log(error);

        res.status(500).json({
            message:"Error"
        });

    }

};