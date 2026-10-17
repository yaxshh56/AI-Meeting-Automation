import express from "express";

import {
    createSummary,
    getSummaries
}
from "../controllers/summary.controller.js";

const router =
express.Router();

router.post(
    "/create",
    createSummary
);

router.get(
    "/",
    getSummaries
);

export default router;