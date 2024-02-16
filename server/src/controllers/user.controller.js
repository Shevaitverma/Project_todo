import asyncHandler from "express-async-handler";
import { User } from "../models/auth/user.model.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import { Todo } from "../models/app/todo.model.js";


// generate access and refresh tokens
const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        if(!user){
            throw new ApiError(404, "User not found")
        }
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        console.error('Error generating tokens:', error);
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}



// registeration controller
const registerUser = asyncHandler(async(req, res)=> {
    // get user details
    const {fullName, email, username, password} = req.body;

    // validation if user entered details or not 
    if (!fullName || !email || !username || !password){
        throw new ApiError(400, "All fields are required")
    }

    // check if password is atleast 8 characterse long 
    if(password.length < 8){
        throw new ApiError(400, "Password must be 8 characters long")
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

// login user controller 
const loginUser = asyncHandler(async(req, res)=>{
    // get data from body 
    const {username, email, password} = req.body;

    // username or email
    if(!username && !email){
        throw new ApiError(400, "Username or Email is required")
    }

    // find the user
    const user = await User.findOne({
        $or : [{username}, {email}] // mongo quiery for OR operator
    })
    if(!user){
        throw new ApiError(400, "User not exist, Please check username and password")
    }

    // check the password
    const checkPass = await user.isPasswordCorrect(password);
    if(!checkPass){
        throw new ApiError(401, "Password is incorrect")
    }

    // access and refresh token 
    try {
        const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)
        const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
    
        // send cookie 
        const options = {
            httpOnly: true,
            secure: true
        }
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "User Logged in sucessfully",
                
            )
        )
    } catch (error) {
        console.error('Error generating tokens:', error);
        throw new ApiError(500, 'Token generation failed');
    }
    
})

// Logout user 
const logoutUser = asyncHandler (async(req, res)=>{
    
    // quiery to clear refresh token
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        }
    )

    // for clearing cookie
    const options = {
        httpOnly: true,
        secure: true
    }
    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out sucessfully"))
})

// current user 
const getCurrentUser = asyncHandler(async(req, res)=>{
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            req.user,
            "Current user fetched successfully"
        )
    )
})

// change password  
const changeCurrentPassword = asyncHandler(async(req, res)=>{
    // get data from body 
    const {oldPassword, newPassword} = req.body;
    if (!oldPassword || !newPassword) {
        throw new ApiError(400, "Both oldPassword and newPassword are required");
    }
    
    // check if password is atleast 8 characterse long 
    if(newPassword.length < 8){
        throw new ApiError(400, "Password must be 8 characters long")
    }

    // get user data 
    const user = await User.findById(req.user?._id);
    
    // check if password is correct
    const checkPass = await user.isPasswordCorrect(oldPassword);
    if(!checkPass){
        throw new ApiError(401, "Password is incorrect")
    }

    // set new password 
    user.password = newPassword;
    await user.save({validateBeforeSave: false})

    // returning response
    return res.status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "Password changed successfully"
        )
    )
})

// update account details...
const updateAccountDetails = asyncHandler(async(req, res)=> {
    
    // get data from the body 
    const {fullName, email} = req.body;

    if(!fullName || !email){
        throw new ApiError(401, "All fields are required");
    }

    // update user 
    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullName,
                email
            }
        },
        { new: true} // This ensures that updated document is returned
    ).select("-password")

    if(!user){
        throw new ApiError(401, "User not found or not authenticated")
    }

    return res.status(200)
    .json(
        new ApiResponse(200, user, "Account details updated successfully")
    )
})

// Delete user controller
const deleteUser = asyncHandler(async (req, res) => {
    // Get the user ID from the authenticated user
    const userId = req.user?._id;

    // Check if the user ID is available
    if (!userId) {
        throw new ApiError(401, "User not authenticated");
    }

    // Delete all Todos associated with the user
    await Todo.deleteMany({ createdBy: userId });

    // Find and delete the user by ID
    await User.findByIdAndDelete(userId).select("-password -refreshToken");// select field ensure that sensitive information is not given to anyone 

    // Respond with a success message
    return res.status(200).json(
        new ApiResponse(200, {}, "User account deleted successfully")
    );
});

export {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    changeCurrentPassword,
    updateAccountDetails,
    deleteUser
}