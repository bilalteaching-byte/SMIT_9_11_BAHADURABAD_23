import { useEffect, useState } from "react";
import heroImg from "../assets/hero.png";
import reactLogo from "../assets/react.svg";
import viteLogo from "../assets/vite.svg";
import Button from "../components/button";
import {
  btnStyles,
  colors,
  fontFamilies,
  fontSizes,
  fontWeights,
  textAlign,
} from "../constant/theme";
import Text from "../components/text";

function generateColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}


function LearninUseEffect() {
  const [count, setCount] = useState(0);
  const [bgColor, setBgColor] = useState();

  useEffect( ()=>{
    console.log("use effect chalgya")
    let bg = generateColor()
    setBgColor(bg)
  } , [count])

  return (
    <div style={{backgroundColor : bgColor}}>
      <Text title={"Count"} size={fontSizes.huge} />
      <Text title={count} size={fontSizes.huge} />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          title={"Plus"}
          onClick={() => setCount(count + 1)}
          className={btnStyles.btnSuccess}
        />
        <Button
          title={"Minus"}
          onClick={() => setCount(count - 1)}
          className={btnStyles.btnDanger}
        />
      </div>
    </div>
    
  );
}

export default LearninUseEffect;
