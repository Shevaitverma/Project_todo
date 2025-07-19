// TodoList.jsx
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { removeTodo, updateTodo, setError, clearError } from "../../app/store";
import { deleteTodo, editTodo } from "../../Services/TodoApi";
import { useState } from "react";
import EditTodoForm from "./TodoEditFrom";
import TodoItem from "./TodoItem";

function TodoList() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const error = useSelector((state) => state.error);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    
    setIsLoading(true);
    dispatch(clearError());
    
    try {
      await deleteTodo(id);
      dispatch(removeTodo(id));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = (id) => {
    setEditingId(id);
    dispatch(clearError());
  };

  const handleSaveEdit = async (updatedTodo) => {
    setIsLoading(true);
    dispatch(clearError());
    
    try {
      const data = await editTodo(updatedTodo._id, {
        title: updatedTodo.title,
        description: updatedTodo.description,
      });
      // Dispatch the full response object - Redux will handle the structure
      dispatch(updateTodo(data));
      setEditingId(null);
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      setIsLoading(false);
    }
  };

  if (todos.length === 0) {
    return (
      <div className="card text-center py-16">
        <div className="w-20 h-20 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">No Tasks Yet</h3>
        <p className="text-gray-400 mb-6 max-w-md mx-auto">
          You haven't created any tasks yet. Start by adding your first task using the form on the left.
        </p>
        <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Your Tasks</h2>
          <p className="text-gray-400">Manage and organize your todo items</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-400">Live Updates</span>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Todo Grid */}
      <div className="grid gap-6">
        {todos.map((todo, index) => (
          <div
            key={todo._id}
            className="card group hover:shadow-xl transition-all duration-300 fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {editingId === todo._id ? (
              <EditTodoForm
                todo={todo}
                onSave={handleSaveEdit}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <div className="space-y-4">
                <TodoItem todo={todo} />
                
                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-600">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleEditClick(todo._id)}
                      disabled={isLoading}
                      className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      <span>Edit</span>
                    </button>
                    
                    <button
                      onClick={() => handleDelete(todo._id)}
                      disabled={isLoading}
                      className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      <span>Delete</span>
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Created {new Date(todo.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg flex items-center space-x-3">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-white">Processing...</span>
          </div>
        </div>
      )}
    </div>
  );
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
};

export default TodoList;
