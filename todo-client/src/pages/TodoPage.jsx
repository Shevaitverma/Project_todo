import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoForm from "../components/app/TodoForm";
import TodoList from "../components/app/TodoList";
import { fetchTodos } from "../Services/TodoApi";
import { getTodos, setError, clearError } from "../app/store";
import { useNavigate } from "react-router-dom";

export default function TodoPage() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const history = useNavigate();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  useEffect(() => {
    const fetchData = async () => {
      if (!isLoggedIn) return;
      
      try {
        dispatch(clearError());
        const data = await fetchTodos();
        // Dispatch the full response object - Redux will handle the structure
        dispatch(getTodos(data));
      } catch (error) {
        dispatch(setError(error.message));
      }
    };

    fetchData();
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn) {
      history("/login");
    }
  }, [isLoggedIn, history]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Your Todo Dashboard
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Stay organized and boost your productivity. Create, manage, and track your tasks with ease.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="card text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">{todos.length}</div>
            <div className="text-gray-400">Total Tasks</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {todos.filter(todo => todo.completed).length}
            </div>
            <div className="text-gray-400">Completed</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">
              {todos.filter(todo => !todo.completed).length}
            </div>
            <div className="text-gray-400">Pending</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Todo Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <TodoForm />
            </div>
          </div>

          {/* Todo List */}
          <div className="lg:col-span-2">
            {isLoggedIn && todos ? (
              <TodoList todos={todos} />
            ) : (
              <div className="card text-center py-12">
                <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Authentication Required</h3>
                <p className="text-gray-400">Please login to view and manage your todos.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
