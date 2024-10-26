// TodoList.jsx
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { removeTodo, updateTodo } from "../../app/store";
import { deleteTodo, editTodo } from "../../Services/TodoApi";
import { useState } from "react";
import EditTodoForm from "./TodoEditFrom";
import TodoItem from "./TodoItem"; // Import TodoItem

function TodoList() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos); // Get todos from the store
  const [editingId, setEditingId] = useState(null); // Track which todo is being edited

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this todo?")) return;
    try {
      await deleteTodo(id);
      dispatch(removeTodo(id));
    } catch (error) {
      console.error("Error while deleting: ", error);
    }
  };

  const handleEditClick = (id) => {
    setEditingId(id);
  };

  const handleSaveEdit = async (updatedTodo) => {
    try {
      const data = await editTodo(updatedTodo._id, {
        title: updatedTodo.title,
        description: updatedTodo.description,
      });
      dispatch(updateTodo(data)); // Update in Redux store
      setEditingId(null); // Close edit mode
    } catch (error) {
      console.error("Error while editing: ", error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold text-center mb-6">Your Todo List</h2>
      {todos.map((todo) => (
        <div
          key={todo._id}
          className="max-w-md mx-auto mt-6 p-6 bg-gradient-to-br from-blue-200 to-blue-300 rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
        >
          {editingId === todo._id ? (
            <EditTodoForm
              todo={todo}
              onSave={handleSaveEdit}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <TodoItem todo={todo} />
          )}
          <div className="flex justify-between items-center mt-4">
            <div>
              <button
                onClick={() => handleEditClick(todo._id)}
                className="text-black bg-yellow-400 rounded-lg px-4 py-2 transition-colors duration-200 hover:bg-yellow-500 focus:outline-none focus:ring focus:ring-yellow-300"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(todo._id)}
                className="text-white bg-red-500 rounded-lg px-4 py-2 ml-2 transition-colors duration-200 hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TodoList;
