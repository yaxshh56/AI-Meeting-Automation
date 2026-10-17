import { Attendance } from "../models/attendance.model.js";

export const getAttendance = async (req, res) => {
    try {

        const attendance = await Attendance.find()
            .sort({ joinTime: -1 });

        res.status(200).json(attendance);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Error fetching attendance"
        });

    }
};