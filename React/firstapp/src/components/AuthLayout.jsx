import { Outlet } from "react-router";
import Navbar from "./navbar";
import Text from "./text";

function AuthLayout({ children }) {
  return (
    <div>
      <div className="flex">
        <Text title={"Logo"} />
      </div>
      <Outlet />
    </div>
  );
}

export default AuthLayout;
