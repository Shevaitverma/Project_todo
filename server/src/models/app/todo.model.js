import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema (
    {
        title: {
            type: String,
            required: [true, "Please enter title"]
        },
        description: {
            type: String,
            required: [true, "Please enter description"]
        },
        completed: {
            type: Boolean,
            default: false
        },
        createdBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "User",
            required:true
        }
    }, { timestamps: true }
)

export const Todo = mongoose.model("Todo", todoSchema);