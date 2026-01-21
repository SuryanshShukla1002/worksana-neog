import express from "express";
import { verifyToken } from '../utils/verifyUser.js';
import { lastWeekReport } from '../controllers/report.controllr.js';

const router = express.Router();

router.get("/last-week", verifyToken, lastWeekReport);

export default router;