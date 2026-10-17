import express from "express";

import {
    createRecording,
    getRecordings
}
from "../controllers/recording.controller.js";

const router =
express.Router();

router.post(
    "/create",
    createRecording
);

router.get(
    "/",
    getRecordings
);

export default router;