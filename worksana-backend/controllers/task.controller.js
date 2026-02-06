import Task from '../models/task.model.js';
import { errorHandler } from '../utils/error.js';


export const createTask = async (req, res, next) => {
    try {
        const task = await Task.create(req.body);
        if (task) {
            const populatedTask = await Task.findById(task._id).populate("project", "name")
                .populate("team", "name description")
                .populate("owners", "name email");
            res.status(201).json(populatedTask);
        } else {
            res.status(404).json({ message: "Unable to create the leads" });
        }
    } catch (error) {
        next(error);
    }
};

export const getAllTask = async (req, res, next) => {
    try {
        const getTask = await Task.find().populate("project", "name")
            .populate("team", "name description")
            .populate("owners", "name email");
        if (!getTask) {
            return next(errorHandler(404, "Tasks not found"));
        }
        return res.status(200).json(getTask);
    } catch (error) {
        next(error);
    }
};

export const getTaskById = async (req, res, next) => {
    try {
        const taskget = await Task.findById(req.params.detailId).populate("project", "name")
            .populate("team", "name description")
            .populate("owners", "name email");
        res.status(200).json(taskget);
    } catch (error) {
        next(error);
    }
};
 
export const updateTask = async (req, res, next) => {
    try {
        const taskupdation = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!taskupdation) {
            return next(errorHandler(404, "Task not found"));
        }

        if (taskupdation) {
            const populatedTasKUpdation = await Task.findById(taskupdation._id).populate("project", "name").populate("team", "name description")
                .populate("owners", "name email");

            res.status(200).json(populatedTasKUpdation);
        }
    } catch (error) {
        next(error);
    }
};

export const deleteTask = async (req, res, next) => {
    try {
        const taskDeletion = await Task.findByIdAndDelete(req.params.id);
        if (!taskDeletion) {
            return next(errorHandler(404, "Task not found"));
        }
        res.status(200).json({ message: "Task deleted Successfully" });
    } catch (error) {
        next(error);
    }
};