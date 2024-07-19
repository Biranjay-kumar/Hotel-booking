import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <div className="bg-blue-700 py-6">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-white font-bold text-3xl tracking-tighter">
          <Link to="/" className="hover:text-yellow-300">
            <span className="text-yellow-300">Travel</span>
            <span className="text-white">Nest</span>
          </Link>
        </span>
        <span className="flex space-x-2 text-white">
          {isLoggedIn ? (
            <>
              <Link to="/my-bookings" className="flex items-center text-white px-3 font-bold hover:shadow-md hover:text-yellow-400">My Bookings</Link>
              <Link to="/my-hotels" className="flex items-center text-white px-3 font-bold hover:shadow-md hover:text-yellow-400">My Hotels</Link>
              <SignOutButton/>
            </>
          ) : (
            <Link to="/sign-in" className="flex items-center  px-3 font-bold hover:text-yellow-300 cursor-pointer">
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
