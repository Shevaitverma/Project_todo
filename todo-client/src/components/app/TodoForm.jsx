import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../../app/store";

const TodoForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  // Selector to access isLoggedIn state from the Redux store
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if user is logged in
    // console.log(isLoggedIn);
    if (!isLoggedIn) {
      console.error("User is not logged in");
      return;
    }
    // Perform action if user is logged in
    try {
      const token = localStorage.getItem("token");
      // console.log(token);
      const response = await fetch("http://localhost:4001/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });
      // console.log(JSON.stringify({ title, description }));
      // console.log(response);
      if (!response.ok) {
        throw new Error("Failed to add todo");
      }
      const data = await response.json();
      // Dispatch addTodo action with data received from server
      dispatch(addTodo(data));
      // Clear input fields after successful submission
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Todo is not created: ", error);
    }
  };

  // Render the TodoForm component
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md w-4/5">
      <h2 className="text-2xl font-bold mb-4">Add Todo</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleTitleChange}
            className="w-full h-10 rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter todo title..."
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={handleDescriptionChange}
            className="w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter todo description..."
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Add Todo
        </button>
      </form>
    </div>
  );
};

// Export the TodoForm component
export default TodoForm;
