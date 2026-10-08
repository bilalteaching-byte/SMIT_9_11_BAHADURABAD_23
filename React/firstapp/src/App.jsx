import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import Button from "./components/button";
import {
  btnStyles,
  colors,
  fontFamilies,
  fontSizes,
  fontWeights,
  textAlign,
} from "./constant/theme";
import Text from "./components/text";
import { NavLink, Link, BrowserRouter, Routes, Route } from "react-router";
import Navbar from "./components/navbar";
import Todos from "./pages/todo.jsx";
import LearninUseEffect from "./pages/learningUseEffect.jsx";
import Stopwatch from "./pages/Stopwatch.jsx";
import About from "./pages/About.jsx";
import Products from "./pages/Products.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import AuthLayout from "./components/AuthLayout.jsx";
import HomeLayout from "./components/HomeLayout.jsx";

function App() {
 

  return (
     <BrowserRouter>
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
      </Route>

      <Route element={<HomeLayout />}>
        <Route path="/" element={<Todos />} />
        <Route path="/todo" element={<Todos />} />
        <Route path="/watch" element={<Stopwatch />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
