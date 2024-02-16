import asyncHandler from "express-async-handler";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import { Todo } from "../models/app/todo.model.js";

// Create a new todo
const createTodo = asyncHandler(async(req, res)=> {
    
    // get data 
    const {title, description} = req.body;

    if(!title || !description){
        throw new ApiError(400, "Title and description is required.")
    }

    // create todo
    const todo = await Todo.create({
        title,
        description,
        createdBy: req.user._id // we are getting _id from auth middleware if user is logged in.
    })

    if(!todo){
        throw new ApiError(400, "Something went wrong, while creating todo.")
    }

    return res.status(201).json(
        new ApiResponse(200,"Todo screated successfully.")
    )
})


export {
    createTodo
}