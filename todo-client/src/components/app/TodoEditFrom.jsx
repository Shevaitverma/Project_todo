import { useState } from "react";
import PropTypes from "prop-types";

const EditTodoForm = ({ todo, onSave, onCancel }) => {
  const [title, setTitle] = useState(todo.title || "");
  const [description, setDescription] = useState(todo.description || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSave = async () => {
    if (!title.trim() || !description.trim()) {
      return;
    }
    
    setIsLoading(true);
    try {
      await onSave({ ...todo, title: title.trim(), description: description.trim() });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (isLoading) return;
    onCancel();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Edit Task</h3>
          <p className="text-sm text-gray-400">Update your task details</p>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-4">
        <div>
          <label htmlFor="edit-title" className="block text-sm font-medium text-gray-300 mb-2">
            Task Title
          </label>
          <input
            type="text"
            id="edit-title"
            value={title}
            onChange={handleTitleChange}
            className="input-field w-full focus-ring"
            placeholder="What needs to be done?"
            required
          />
        </div>

        <div>
          <label htmlFor="edit-description" className="block text-sm font-medium text-gray-300 mb-2">
            Description
          </label>
          <textarea
            id="edit-description"
            value={description}
            onChange={handleDescriptionChange}
            rows="4"
            className="input-field w-full focus-ring resize-none"
            placeholder="Add more details about this task..."
            required
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-600">
        <button
          onClick={handleCancel}
          disabled={isLoading}
          className="px-6 py-2 text-gray-300 hover:text-white border-2 border-gray-600 hover:border-gray-500 rounded-lg font-medium transition-all duration-200 disabled:opacity-50"
        >
          Cancel
        </button>
        
        <button
          onClick={handleSave}
          disabled={isLoading || !title.trim() || !description.trim()}
          className="btn-primary px-6 py-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Saving...</span>
            </div>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </div>
  );
};

EditTodoForm.propTypes = {
  todo: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default EditTodoForm;
