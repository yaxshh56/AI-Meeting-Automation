import express from "express";

import {
    createSchedule,
    getSchedules,
    markHostJoined,
    markAIJoined
}
from "../controllers/schedule.controller.js";

const router = express.Router();

router.post(
    "/create",
    createSchedule
);

router.post(
    "/host-joined",
    markHostJoined
);

router.post(
    "/ai-joined",
    markAIJoined
);

router.get(
    "/",
    getSchedules
);
router.get("/all", getSchedules);


export default router;