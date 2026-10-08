import { Link, useNavigate } from "react-router";
import Button from "../components/button";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
   setTimeout(() => {
      navigate("/");
   }, 1000);
  };
  return (
    <div className="h-full flex flex-col gap-2 justify-center items-center">
      <h2>Login</h2>
      <input placeholder="Username" />
      <input placeholder="Email" />
      <input placeholder="Password" type="password" />
      <Button title={"Login"} onClick={handleLogin} />
      <Link to={"/register"}>Register your account</Link>
    </div>
  );
}

export default Login;
