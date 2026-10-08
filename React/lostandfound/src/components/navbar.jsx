import { Link } from "react-router";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";

function Navbar() {

  const handleLogout =async ()=>{
    await signOut(auth)
  }
  return (
    <div className="flex items-center justify-between p-3 ">
      <h1>Logo</h1>
      {auth.currentUser ? (
        <div className="flex gap-2">
          <span>{auth?.currentUser?.email}</span>
          <button className="cursor-pointer" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <Link to={"/auth"}>Login </Link>
      )}
    </div>
  );
}

export default Navbar;
