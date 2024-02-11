import asyncHandler from "express-async-handler";
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// function to generate jwt token.

//.............. Register User................
const registerUser = asyncHandler(async (req, res) =>{
    const {name, email, password} = req.body



    //validation....................
    if(!name || !email || !password){
        res.status(400)
        throw new Error("please fill  in all required fields")
    }
    if(password.length < 6){
        res.status(400)
        throw new Error("password must be 6 characters")
    }


    // chech if user email already exists............
    const userExist = await User.findOne({email})
    if(userExist){
        res.status(400)
        throw new Error("User email already regestered")
    }


    // create new user
    const user = await User.create({
        name,
        email,
        password
    })

    
    if(user){
        const {_id, name, email} = user
        res.status(201).json({
            _id,
            name, 
            email,
            token
        })
    }else{
        res.status(400)
        throw new Error("Invalid user data");
    }
});





export {
    registerUser
}