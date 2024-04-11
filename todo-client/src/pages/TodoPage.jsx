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
      

    // dispatch(getTodos(data));
    // fetchTodos();
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
