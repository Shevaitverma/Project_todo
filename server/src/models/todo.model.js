import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema(
    {
        content:{
            type: String,
            require: true
        },
        status: {
            type: String,
            enum: ["PENDING", "COMPLETED"],
            default:"PENDING"
        },
        createdBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        subTodos: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:"SubTodo"
            }
        ] // array of sub todos
    },
    {timestamps:true}
)

export default Todo = mongoose.model("Todo", todoSchema);