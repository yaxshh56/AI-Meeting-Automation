import { Summary }
from "../models/summary.model.js";

export const createSummary =
async(req,res)=>{

    try{

        const summary =
        await Summary.create(
            req.body
        );

        res.status(201).json(
            summary
        );

    }
    catch(error){

        console.log(error);

        res.status(500).json({
            message:"Error"
        });

    }

};

export const getSummaries =
async(req,res)=>{

    try{

        const summaries =
        await Summary.find()
        .sort({_id:-1});

        res.status(200).json(
            summaries
        );

    }
    catch(error){

        console.log(error);

        res.status(500).json({
            message:"Error"
        });

    }

};