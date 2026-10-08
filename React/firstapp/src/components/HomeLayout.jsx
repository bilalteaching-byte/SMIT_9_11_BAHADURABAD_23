import { Link, Outlet } from "react-router";
import Navbar from "./navbar";

function HomeLayout({ children }) {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <div className="w-[200px] border-r border-r-blue-300 flex flex-col gap-2">
          <Link to={"/todo"}>Todo</Link>
          <Link to={"/watch"}>Watch</Link>
          <Link to={"/products"}>Products</Link>
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default HomeLayout;
