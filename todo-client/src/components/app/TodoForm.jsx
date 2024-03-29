import { useState } from "react";

const TodoForm = () => {
  const [todo, setTodo] = useState("");

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your todo creation logic here
    console.log(todo);
    // Clear the input field after submission
    setTodo("");
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md w-4/5">
      <h2 className="text-2xl font-bold mb-4">Add Todo</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="todo" className="block text-gray-700">
            Todo
          </label>
          <input
            type="text"
            id="todo"
            name="todo"
            value={todo}
            onChange={handleChange}
            className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm placeholder-text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

export default TodoForm;
