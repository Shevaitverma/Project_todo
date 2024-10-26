import { useState } from "react";
import PropTypes from "prop-types";

const EditTodoForm = ({ todo, onSave, onCancel }) => {
  const [title, setTitle] = useState(todo.title || "");
  const [description, setDescription] = useState(todo.description || "");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSave = () => {
    onSave({ ...todo, title, description });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
      <h3 className="text-lg font-semibold mb-4">Edit Todo</h3>
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          className="w-full mb-2 border border-gray-300 rounded px-2 py-1"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={handleDescriptionChange}
          className="w-full mb-2 border border-gray-300 rounded px-2 py-1"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button onClick={onCancel} className="px-4 py-2 text-gray-500 border border-gray-300 rounded">
          Cancel
        </button>
        <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">
          Save
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
