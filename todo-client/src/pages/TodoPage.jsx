import TodoFrom from "../components/app/TodoForm";
import TodoItem from "../components/app/TodoItem";

export default function TodoPage() {
  return (
    <div className="h-screen flex flex-col justify-center bg-[#252861]">
      <TodoFrom />
      <TodoItem />
    </div>
  );
}
