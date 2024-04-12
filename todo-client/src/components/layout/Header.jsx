import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutButton from "../auth/LogoutButton";

const Header = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  // console.log(isLoggedIn);

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Todo Manager</h1>
        <nav>
          <ul className="flex space-x-3">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>

            {isLoggedIn ? (
              <div className="flex space-x-10">
                <li>
              <Link to="/todo-page" className="hover:underline">
                Todo List
              </Link>
            </li>
                <li>
                <Link to="/login" className="hover:underline">
                <LogoutButton />
                </Link> 
                </li>
              </div>
              
            ) : (
              <div className="flex bg-[#176881] text-white font-bold py-1 rounded">
                <li>
                <Link to="/login" className="hover:bg-[#2f8025] px-3 py-2 rounded">
                  Login
                </Link>
                </li>
                <p>|</p>
                <li>
              <Link to="/register" className="hover:bg-[#2f8025] px-3 py-2 rounded">
                Register
              </Link>
            </li>
              </div>
              
            )}
            
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
