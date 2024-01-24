import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name:{
        type: String,
        require: [true, "please add a name"]
    },
    email:{
        type: String,
        require: [true, "please add a name"],
        unique: true,
        trim: true,
        match:[
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            "please enter a valid email"
        ]
    },
    password:{
        type: String,
        require: [true, "please add a password"],
        minLength: [6, "password must be up to 6 characters"]
    },  
},
{
    timestamps:true,
});
const User = mongoose.model("User", userSchema);

export default User
