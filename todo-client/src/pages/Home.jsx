import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="h-screen flex flex-col justify-center bg-[#252861]">
      <div className="max-w-4xl mx-auto mt-8 p-6 text-[#b3b4b6]">
        <h1 className="text-3xl font-bold mb-4">Welcome to Your Todo App</h1>
        <p className="text-lg text-[#9f4db8]">
          This is a simple todo application where you can keep track of your
          tasks. Get started by logging in or registering if you have not
          already.
        </p>
      </div>
      <Link
        to="/login"
        className="block max-w-sm mx-auto mt-8 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Get Started
      </Link>
    </div>
  );
};

export default Home;
