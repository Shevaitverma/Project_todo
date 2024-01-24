import mongoose from 'mongoose';

const subTodoSchema = new mongoose.Schema(
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
        }
    },
    {timestamps:true}
);

export default SubTodo = mongoose.model("SubTodo", subTodoSchema);