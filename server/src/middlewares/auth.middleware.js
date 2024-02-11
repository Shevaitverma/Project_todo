import asyncHandler from 'express-async-handler';
import { ApiError } from '../utils/ApiError.js';
import jwt from "jsonwebtoken";
import {User} from '../models/user.model.js'

export const verifyJWT = asyncHandler( async(req, _ , next)=> {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    
        if(!token){
            throw new ApiError(401, "Unauthorized request, please login");
        }
    
        // varify token
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        // get user id from token
        const user = await User.findById(decodedToken._id).select("-password -refreshToken");
    
        if(!user){
            throw new ApiError(401, "Invalid access token")
        }
    
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Access Token")
    }
})