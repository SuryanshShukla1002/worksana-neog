import express from 'express';
import cors from 'cors';
import { setupTheDatabase } from './database/db.connection.js';
import authRouter from './routes/auth.route.js';
import taskRouter from './routes/task.route.js';
import teamRouter from './routes/team.route.js';
import projectsRouter from './routes/projects.route.js';
import tagRouter from './routes/tag.route.js';
import cookieParser from 'cookie-parser';
import reportRouter from './routes/report.route.js';
import userRouter from './routes/user.route.js';

const app = express();

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://workasanaa.vercel.app",
        ],
        credentials: true,
    })
);
app.use(cookieParser());
app.use(express.json());

await setupTheDatabase();

app.use('/api/auth', authRouter);
app.use("/api/task", taskRouter);
app.use("/api/team", teamRouter);
app.use("/api/project", projectsRouter);
app.use("/api/tag", tagRouter);
app.use("/api/report", reportRouter);
app.use("/api/users", userRouter);



export default app;
