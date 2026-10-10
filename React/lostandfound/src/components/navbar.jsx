import { Link } from "react-router";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useTheme } from "../contex/ThemeContext";

function Navbar({ user }) {

  const { mode, toggleTheme } = useTheme();

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-gray-900 hover:text-blue-600 transition">
          Lost & Found
        </Link>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${mode === "light" ? "dark" : "light"} theme`}
            className="border border-gray-300 rounded-xl px-3 py-2 text-sm font-medium hover:bg-gray-100 transition"
          >
            {mode === "light" ? "Dark mode" : "Light mode"}
          </button>
          {user ? (
            <span className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm font-medium">
              {user.email}
            </span>
          ) : null}
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-xl transition"
            >
              Logout
            </button>
          ) : (
          <Link
            to="/auth"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl transition"
          >
            Login
          </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
