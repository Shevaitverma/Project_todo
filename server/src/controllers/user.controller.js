import asyncHandler from "express-async-handler";
import { User } from "../models/auth/user.model.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";

// registeration controller
const registerUser = asyncHandler(async(req, res)=> {
    // get user details
    const {fullName, email, username, password} = req.body;

    // validation if user entered details or not 
    if (!fullName || !email || !username || !password){
        throw new ApiError(400, "All fields are required")
    }

    // check if usr already exists - username and email
    const ifExist = await User.findOne({
        $or: [{username}, {email}]
    })
    if(ifExist){
        throw new ApiError(406,"User is already exists")
    }

    // create user object - create entry in DB
    const user = await User.create({
        fullName,
        email,
        username,
        password
    })

    // check for user creation and remove password and refresh token from the response
    const userCreated = await User.findById(user._id).select("-password -refreshToken")
    if(!userCreated){
        throw new ApiError(500, "Something went while registering the user")
    }
    
    // return response
    return res.status(201).json(
        new ApiResponse(200, userCreated, "User registered sucessfully")
    )
})


export {
    registerUser
}