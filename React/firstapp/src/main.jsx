import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Todos from "./pages/todo.jsx";
import LearninUseEffect from "./pages/learningUseEffect.jsx";
import Stopwatch from "./pages/Stopwatch.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import About from "./pages/About.jsx";
import Products from "./pages/Products.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import AuthLayout from "./components/AuthLayout.jsx";
import HomeLayout from "./components/HomeLayout.jsx";

createRoot(document.getElementById("root")).render(<App />);
