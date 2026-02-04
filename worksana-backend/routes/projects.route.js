import express from "express";
import { getAllProject, getProjectById, newProject } from '../controllers/projects.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post("/projects", verifyToken, newProject);
router.get("/projects", verifyToken, getAllProject);
router.get("/getProject/:projectId", verifyToken, getProjectById);

export default router;