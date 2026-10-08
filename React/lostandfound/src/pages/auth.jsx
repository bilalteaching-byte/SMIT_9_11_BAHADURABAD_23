import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import { auth } from "../utils/firebase";

function Auth({ user }) {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [submitting, setSubmitting] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const email = event.target[1].value;
      const password = event.target[2].value;

      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      alert(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const email = event.target[0].value;
      const password = event.target[1].value;

      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      alert(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout user={user}>
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          {mode === "login" ? (
            <>
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Login</h1>
              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Email"
                  disabled={submitting}
                  className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                  disabled={submitting}
                  className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-xl py-3 transition flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader size="sm" inline />
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </button>
              </form>
              <p className="text-gray-500 text-sm mt-6 text-center">
                New to the platform?{" "}
                <button
                  onClick={() => setMode("register")}
                  disabled={submitting}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Register
                </button>
              </p>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Sign Up</h1>
              <form onSubmit={handleRegister} className="flex flex-col gap-4">
                <input
                  name="username"
                  type="text"
                  placeholder="Username"
                  required
                  disabled={submitting}
                  className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Email"
                  disabled={submitting}
                  className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  name="password"
                  required
                  type="password"
                  placeholder="Password"
                  disabled={submitting}
                  className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-xl py-3 transition flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader size="sm" inline />
                      Signing up...
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </form>
              <p className="text-gray-500 text-sm mt-6 text-center">
                Already have an account?{" "}
                <button
                  onClick={() => setMode("login")}
                  disabled={submitting}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Login
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Auth;
