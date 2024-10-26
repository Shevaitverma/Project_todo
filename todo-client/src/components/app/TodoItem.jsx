export default function TodoItem({ todo }) {
  if (!todo) {
    return null;
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-[#ffffff] rounded-lg shadow-lg w-full transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
      <h3 className="text-xl font-bold text-[#4a4a4a] mb-2">{todo.title}</h3>
      <p className="text-md text-[#666666] mb-4">{todo.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-[#999999]">{todo.createdAt}</span>
      </div>
    </div>
  );
}
