import dotenv from "dotenv";
import connectDB from './src/db/index.js';
import {app} from './app.js'

dotenv.config();


connectDB()
.then(()=>{
    app.listen(process.env.PORT || 4002, ()=>{
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("mongodb Connection failed!!!");
})