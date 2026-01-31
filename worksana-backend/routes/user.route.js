import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { getAllUsers } from '../controllers/user.controller.js';

const router = express.Router();

router.get("/user", verifyToken, getAllUsers);

export default router;