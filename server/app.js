import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./src/routes/user.routes.js";

const app = express();

app.use(cors()); // handles cross origin resource sharing
app.use(express.json({limit: "16kb"}));// limit json data so that server didn't crsh due to overload.
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));
app.use(cookieParser());

//test route
app.get('/', (req, res)=>{
    res.status(200).send("server is working");
});


//main routes
app.use("/todo/users",userRoute);


export { app };