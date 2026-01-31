import UserSchema from '../models/user.model.js';

export const getAllUsers = async (req, res, next) => {
    try {
        const getAll = await UserSchema.find().select("_id name email");
        res.status(200).json(getAll);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch all users" });
    }
};