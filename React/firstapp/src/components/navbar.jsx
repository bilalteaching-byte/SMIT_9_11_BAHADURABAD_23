import { NavLink } from "react-router";

function Navbar() {
  return (
    <div className="flex justify-center items-center py-1 gap-3 border-b border-b-gray-400 mb-2 ">
      <NavLink
        to={"/"}
        className={({ isActive }) =>
          isActive ? "text-blue-600 underline" : "text-black"
        }
      >
        Home
      </NavLink>
      <NavLink
        to={"/todo"}
        className={({ isActive }) =>
          isActive ? "text-blue-600 underline" : "text-black"
        }
      >
        Todo
      </NavLink>
      <NavLink
        to={"/watch"}
        className={({ isActive }) =>
          isActive ? "text-blue-600 underline" : "text-black"
        }
      >
        Watch
      </NavLink>
      <NavLink
        to={"/products"}
        className={({ isActive }) =>
          isActive ? "text-blue-600 underline" : "text-black"
        }
      >
        Products
      </NavLink>
      <NavLink
        to={"/about"}
        className={({ isActive }) =>
          isActive ? "text-blue-600 underline" : "text-black"
        }
      >
        About
      </NavLink>
    </div>
  );
}

export default Navbar;
