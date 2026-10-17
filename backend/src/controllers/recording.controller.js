import { Recording }
from "../models/recording.model.js";

export const createRecording =
async(req,res)=>{

    try{

        const recording =
        await Recording.create(
            req.body
        );

        res.status(201).json(
            recording
        );

    }
    catch(error){

        console.log(error);

        res.status(500).json({
            message:"Error"
        });

    }

};

export const getRecordings =
async(req,res)=>{

    try{

        const recordings =
        await Recording.find()
        .sort({_id:-1});

        res.status(200).json(
            recordings
        );

    }
    catch(error){

        console.log(error);

        res.status(500).json({
            message:"Error"
        });

    }

};