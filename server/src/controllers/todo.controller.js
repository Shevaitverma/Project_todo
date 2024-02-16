import asyncHandler from "express-async-handler";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import { Todo } from "../models/app/todo.model.js";
import { User } from "../models/auth/user.model.js";

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
    
    // updating user's array of todoId's
    const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        {
            $push: {todos: todo._id}
        },
        { new:true }
    )
    if(!updatedUser){
        throw new ApiError(400, "TodoID not updated.")
    }

    return res.status(201).json(
        new ApiResponse(200, todo, "Todo screated successfully.")
    )
})

// get all todos 
const getTodos = asyncHandler(async(req, res)=> {
    // get user's ID 
    const userId = req.user._id
    // get all todos for logged in user
    const todos = await Todo.find(
        {
            createdBy: userId
        }
    )
    if(!todos){
        throw new ApiError(400, "Todos are empty.")
    }
    

    return res.status(200).json(
        new ApiResponse(200, todos, "Todos fetched successfully.")
    )
})

// Get a single todo by ID
const getTodo = asyncHandler(async (req, res) => {
    const todoId = req.params.id;
  
    const todo = await Todo.findOne(
        {
            _id: todoId,
            createdBy: req.user._id
        }
    );
  
    if (!todo) {
      throw new ApiError(404, "Todo not found");
    }
  
    return res.status(200).json(new ApiResponse(200, todo, "Todo fetched successfully"));
  });

export {
    createTodo,
    getTodos,
    getTodo
}