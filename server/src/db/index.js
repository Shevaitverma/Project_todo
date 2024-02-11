import mongoose from "mongoose";
import {DB_NAME} from "../constant.js"

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log(`\nMongoDB connected!! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection failed !!! (ERROR) :", error);
        process.exit(1); // exit the process using exit codes...
    }
}

export default connectDB;