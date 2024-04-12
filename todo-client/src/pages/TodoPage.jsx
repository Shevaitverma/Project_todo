import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoForm from "../components/app/TodoForm";
import TodoList from "../components/app/TodoList";
import { fetchTodos } from "../Services/TodoApi";
import { getTodos } from "../app/store";
import { useNavigate } from "react-router-dom";


export default function TodoPage() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  // console.log(todos);
  const history = useNavigate();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  // console.log(isLoggedIn);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTodos(); // Fetch todos using the fetchTodos function
        dispatch(getTodos(data)); // Dispatch an action to update the state
      } catch (error) {
        console.error("Error fetching todos:", error.message);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, [dispatch]);

  useEffect(() => {
    if (!isLoggedIn) {
      // If user is not logged in, redirect to login page
      history("/login");
    }
  }, [isLoggedIn, history]);

  return (
    <div className="flex flex-col justify-center bg-[#252861]">
      <TodoForm />
      <div className="flex flex-col my-5 ">
      {isLoggedIn && todos ? (
        <TodoList todos={todos} />
      ) : (
        <p className="flex flex-col my-5 ">Please login again!</p>
      )}
      </div>
    </div>
  );
}
