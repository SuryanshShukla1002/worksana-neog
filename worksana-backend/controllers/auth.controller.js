import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserSchema from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import Task from '../models/task.model.js';

export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;
    const hashPassword = bcrypt.hashSync(password, 10);
    const newUser = new UserSchema({
        name,
        email,
        password: hashPassword
    });

    try {
        await newUser.save();
        res.status(201).json("User Created Successfully");
    } catch (error) {
        next(error);
    }
};


export const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validateUser = await UserSchema.findOne({ email });
        if (!validateUser) {
            return next(errorHandler(404, "User not Found"));
        }
        const validatePassword = bcrypt.compareSync(password, validateUser.password);
        if (!validatePassword) {
            return next(errorHandler(401, "Wrong Credentials"));
        }
        const token = jwt.sign({ id: validateUser._id }, process.env.JWT_SECRECT, { expiresIn: "24h" });
        const { password: pass, ...rest } = validateUser._doc;

        res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

export const signOut = async (req, res, next) => {
    try {
        res.clearCookie('access_token');
        res.status(201).json("User Removed");
    } catch (error) {
        next(error);
    }
};

export const authenticatedUser = async (req, res, next) => {
    try {
        const getAuthenticated = await UserSchema.findById(req.user.id).select("-password");
        // console.log(getAuthenticated);
        if (getAuthenticated) {
            return res.status(200).json(getAuthenticated);
        } else {
            return next(errorHandler(404, "User not found"));
        }
    } catch (error) {
        next(error);
    }
};

export const taskUrlBased = async (req, res, next) => {
    try {
        const { project, team, owners, status } = req.query;

        const filters = {};
        if (status) filters.status = status;
        if (project) filters.project = project;
        if (team) filters.team = team;
        if (owners) filters.owners = { $in: [owners] };

        const TaskByUrlBased = await Task.find(filters).populate("project", "name")
            .populate("team", "name description")
            .populate("owners", "name email");

        res.status(200).json(TaskByUrlBased);
    } catch (error) {
        next(error);
    }
};