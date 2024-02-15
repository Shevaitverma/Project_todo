import asyncHandler from "express-async-handler";

// registeration controller
const createTodo = asyncHandler(async(req, res)=> {
    res.send("working")
})


export {
    createTodo
}