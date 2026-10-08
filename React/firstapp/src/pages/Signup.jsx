import { Link } from "react-router";
import Button from "../components/button";

function Signup() {
  return (
    <div className="h-full flex flex-col gap-2 justify-center items-center">
      <h2>Signup</h2>
      <input placeholder="Username" />
      <input placeholder="Email" />
      <input placeholder="Password" type="password" />
      <Button title={"Register"} />
      <Link to={"/login"}>Login your account</Link>

    </div>
  );
}
export default Signup