import PropTypes from 'prop-types'

function TodoList({ todos }) {
    if (!todos) return null
    return (
      <div>
        {todos.map((todo) => (
          <div key={todo._id}>
            <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md w-full">
                <h3 className="text-lg font-semibold">{todo.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{todo.description}</p>
                <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-400">{todo.createdAt}</span>
                </div>
            </div>
          </div>
        ))}
      </div>
    );
}

// Validate the todos prop
TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object), // Ensure todos is an array of objects
};

export default TodoList
