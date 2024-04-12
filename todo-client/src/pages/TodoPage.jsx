import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoForm from "../components/app/TodoForm";
import TodoList from "../components/app/TodoList";
import { fetchTodos } from "../Services/TodoApi";
import { getTodos } from "../app/store";


export default function TodoPage() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  // console.log(todos);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTodos(); // Fetch todos using the fetchTodos function
        // console.log(data);
        dispatch(getTodos(data)); // Dispatch an action to update the state
      } catch (error) {
        console.error("Error fetching todos:", error.message);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, [dispatch]);
  console.log(todos);

  return (
    <div className="flex flex-col justify-center bg-[#252861]">
      <TodoForm />
      <div className="flex flex-col my-5 ">
      {todos ? (
        <TodoList todos={todos} />
      ) : (
        <p>Loading todos...</p>
      )}
      </div>
    </div>
  );
}
