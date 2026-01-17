import express from "express";
import { verifyToken } from '../utils/verifyUser.js';
import { createTask, deleteTask, getAllTask, updateTask } from '../controllers/task.controller.js';

const router = express.Router();

router.post("/tasks", verifyToken, createTask);
router.get("/tasks", verifyToken, getAllTask);
router.post("/tasks/:id", verifyToken, updateTask);
router.delete("/tasks/deleteTeam/:id", verifyToken, deleteTask);

export default router;