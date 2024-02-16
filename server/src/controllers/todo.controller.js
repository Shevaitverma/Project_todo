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

// update todo
const updateTodo = asyncHandler(async (req, res) => {

    const { title, description, completed } = req.body;

    // Check if at least one field is provided for update
    if (!title && !description && completed === undefined) {
        throw new ApiError(400, "At least one field (title, description, completed) is required for update");
    }
    
    // find todo first
    const todoId = req.params.id;
    const todo = await Todo.findById(todoId)
    if(!todo){
        throw new ApiError(404, "Todo not found");
    }

    // ensure that the user making the request is the one who created the todo
    const todoMaker = todo.createdBy.equals(
        req.user._id
    )
    if(!todoMaker){
        throw new ApiError(400, "you don't have permission to update the todo")
    }

    // update todo
    if (title) {
        todo.title = title;
    }

    if (description) {
        todo.description = description;
    }

    if (completed !== undefined) {
        todo.completed = completed;
    }
    await todo.save();

    return res.status(200).json(
        new ApiResponse(200, todo, "Todo updated successfully")
    );
});

// delete Todo
const deleteTodo = asyncHandler(async(req, res)=> {
    const todoId = req.params.id

    // find todo
    const todo = await Todo.findById(todoId)
    if(!todo){
        throw new ApiError(400, "Todo not found")
    }

    // ensure that todo owner is the one who delete todo
    const todoMaker = todo.createdBy.equals(req.user._id);
    if(!todoMaker){
        throw new ApiError(400, "You don't have permission to delete this todo")
    }

    // delete todo
    await Todo.findByIdAndDelete(todoId);

    // Remove the todo ID from the user's todos array
    await User.findByIdAndUpdate(
        req.user._id,
        { 
            $pull: { 
                todos: todoId 
            } 
        },
        { new: true } // To get the updated user document
    );

    return res.status(200).json(
        new ApiResponse(200, {}, "Todo successfully deleted")
    )
})

export {
    createTodo,
    getTodos,
    getTodo,
    updateTodo,
    deleteTodo
}