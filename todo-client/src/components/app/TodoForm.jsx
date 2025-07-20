// TodoForm.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, setError, clearError } from "../../app/store";
import { API_ENDPOINTS } from "../../config/api";

const TodoForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const error = useSelector((state) => state.error);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    dispatch(clearError());
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    dispatch(clearError());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isLoggedIn) {
      dispatch(setError("Please login to create todos"));
      return;
    }

    if (!title.trim() || !description.trim()) {
      dispatch(setError("Please fill in all fields"));
      return;
    }

    setIsLoading(true);
    dispatch(clearError());

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(API_ENDPOINTS.TODOS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: title.trim(), description: description.trim() }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add todo");
      }
      
      const data = await response.json();
      // Dispatch the full response object - Redux will handle the structure
      dispatch(addTodo(data));
      setTitle("");
      setDescription("");
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Add New Task</h2>
          <p className="text-sm text-gray-400">Create a new todo item</p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
            Task Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleTitleChange}
            className="input-field w-full focus-ring"
            placeholder="What needs to be done?"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={handleDescriptionChange}
            rows="4"
            className="input-field w-full focus-ring resize-none"
            placeholder="Add more details about this task..."
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !isLoggedIn}
          className="btn-primary w-full py-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Adding Task...</span>
            </div>
          ) : (
            "Add Task"
          )}
        </button>
      </form>

      {/* Tips */}
      <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <h4 className="text-sm font-medium text-blue-400 mb-2">💡 Tips for better todos:</h4>
        <ul className="text-xs text-gray-400 space-y-1">
          <li>• Be specific and actionable</li>
          <li>• Break large tasks into smaller ones</li>
          <li>• Set realistic deadlines</li>
        </ul>
      </div>
    </div>
  );
};

export default TodoForm;
