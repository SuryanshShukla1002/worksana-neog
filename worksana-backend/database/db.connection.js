import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();


export const setupTheDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log("Connection with database is successfull");
    } catch (error) {
        console.log("Unable to connect with Database");
        throw error;
    }
};