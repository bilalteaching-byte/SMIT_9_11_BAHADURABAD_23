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
import LearninUseEffect from "./pages/learningUseEffect";
import Stopwatch from "./pages/Stopwatch";
import { NavLink, Link } from "react-router";
import Navbar from "./components/navbar";

function App() {
  const [comp, setComp] = useState("counter");

  return (
    <div>
      <Navbar />
      <LearninUseEffect />
    </div>
  );
}

export default App;
