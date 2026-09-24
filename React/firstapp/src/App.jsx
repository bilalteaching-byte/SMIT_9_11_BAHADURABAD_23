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

function App() {
  const [comp, setComp] = useState("counter");

  return (
    <div>
      <Button title={"Counter"} onClick={()=> setComp("counter")} />
      <Button title={"Watch"}  onClick={()=> setComp("stop")} />

        style={{
      {comp === "counter" ? <LearninUseEffect /> : <Stopwatch />}
    </div>
  );
}

export default App;
