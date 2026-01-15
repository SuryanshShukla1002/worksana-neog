import Task from '../models/task.model.js';
import { errorHandler } from '../utils/error.js';


export const createTask = async (req, res, next) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json(task);
    } catch (error) {
        next(error);
    }
};

export const getAllTask = async (req, res, next) => {
    try {
        const getTask = await Task.find();
        if (!getTask) {
            return next(errorHandler(404, "Tasks not found"));
        }
        return res.status(200).json(getTask);
    } catch (error) {
        next(error);
    }
};

export const updateTask = async (req, res, next) => {
    try {
        const taskupdation = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).json(taskupdation);
    } catch (error) {
        next(error);
    }
};