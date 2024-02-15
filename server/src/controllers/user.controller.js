import asyncHandler from "express-async-handler";

// registeration controller
const registerUser = asyncHandler(async(req, res)=> {
    res.send("working")
})


export {
    registerUser
}