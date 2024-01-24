import mongoose from "mongoose";
import { DB_name } from "../../constants.js";

const connectDB = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_name}`);
        console.log(`\nMongoDB Connected!! DB HOST : ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("mongoDB connection Failed");
        process.exit(1);
    }
}

export default connectDB;