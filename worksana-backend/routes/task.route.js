import express from "express";
import { verifyToken } from '../utils/verifyUser.js';
import { createTask, deleteTask, getAllTask, getTaskById, updateTask } from '../controllers/task.controller.js';

const router = express.Router();

router.post("/tasks", verifyToken, createTask);
router.get("/tasks", verifyToken, getAllTask);
router.get("/tasks/:detailId", verifyToken, getTaskById);
router.post("/tasks/:id", verifyToken, updateTask);
router.delete("/tasks/deleteTeam/:id", verifyToken, deleteTask);

export default router;