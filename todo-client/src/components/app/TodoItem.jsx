export default function TodoItem({ todo }) {
  if (!todo) {
    return null;
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md w-full">
      <h3 className="text-lg font-semibold">{todo.title}</h3>
      <p className="text-sm text-gray-500 mt-1">{todo.description}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-400">{todo.createdAt}</span>
      </div>
    </div>
  );
}
