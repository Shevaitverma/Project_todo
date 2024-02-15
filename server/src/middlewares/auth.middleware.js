import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import {User} from '../models/auth/user.model.js';
import {ApiError} from '../utils/ApiError.js';

export const verifyJwt = asyncHandler(async(req, _, next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        if(!token){
            throw new ApiError(401, "Unauthorized request, Login again !!!")
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken._id).select("-password -refreshToken")

        if(!user){
            throw new ApiError(401, "Invalid Access token")
        }

        req.user = user;
        next()
        
    } catch (error) {
        throw new ApiError(401, error?.message || "something went wrong during verifying access token!!!")
    }
})