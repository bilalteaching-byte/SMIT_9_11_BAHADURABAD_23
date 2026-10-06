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

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/todo" element={<Todos />} />
      <Route path="/watch" element={<Stopwatch />} />
      <Route path="/about" element={<About />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<ProductDetail />} />
    </Routes>
  </BrowserRouter>,
);
