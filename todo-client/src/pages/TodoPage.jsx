import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoForm from "../components/app/TodoForm";
import TodoItem from "../components/app/TodoItem";
import { getTodos } from "../app/store";

export default function TodoPage() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  // console.log(todos);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:4001/api/todos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }
        const data = await response.json();
        dispatch(getTodos(data));
        // console.log(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, [dispatch]);
  console.log(todos);

  return (
    <div className="h-screen flex flex-col justify-center bg-[#252861]">
      <TodoForm />
      {/* {todos ? (
        todos.map((todo) => <TodoItem key={todo._id} todo={todo} />)
      ) : (
        <p>Loading todos...</p>
      )} */}
    </div>
  );
}
