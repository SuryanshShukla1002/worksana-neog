import Project from '../models/project.models.js';
import Task from '../models/task.model.js';

export const newProject = async (req, res, next) => {
    try {
        const createProject = await Project.create(req.body);
        res.status(201).json(createProject);
    } catch (error) {
        next(error);
    }
};

export const getAllProject = async (req, res, next) => {
    try {
        const allProject = await Project.find();
        res.status(200).json(allProject);
    } catch (error) {
        next(error);
    }
};

export const getProjectById = async (req, res, next) => {
    try {
        const { projectId } = req.params;
        const getEachProject = await Task.find({ project: projectId }).populate("project", "name description")
            .populate("team", "name description")
            .populate("owners", "name email");
        res.status(200).json(getEachProject);
    } catch (error) {
        next(error);
    }
};