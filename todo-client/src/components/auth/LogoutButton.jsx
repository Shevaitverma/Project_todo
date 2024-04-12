import { useDispatch } from "react-redux";
import { setIsLogged, getTodos } from "../../app/store";

export default function LogoutButton() {
  const dispatch = useDispatch();

    const handleLogout = () => {
        
        dispatch(setIsLogged(false));
        dispatch(getTodos([])); // Clear todos state
        localStorage.removeItem("token");
    };

    return (
        <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold px-3 rounded"
            onClick={handleLogout}
        >
            Logout
        </button>
    );
}
