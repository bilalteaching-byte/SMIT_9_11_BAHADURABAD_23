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


function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
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
    // <>
    //   <Text
    //     title={"Learning React"}
    //     align={textAlign.left}
    //     color={colors.blue}
    //     weight={fontWeights.medium}
    //     family={fontFamilies.sans}
    //     size={40}
    //   />

    //   <Text
    //     title={"Learning React"}
    //     align={"center"}
    //     color={"red"}
    //     weight={"bold"}
    //     size={40}
    //   />

    //   <Text
    //     title={"Learning React"}
    //     align={"right"}
    //     color={"green"}
    //     weight={"bold"}
    //     size={40}
    //   />

    //   <Button
    //     className={btnStyles.btnFilled}
    //     title="Filled"
    //     onClick={() => console.log("filled clicked")}
    //   />

    //   <Button
    //     className={btnStyles.btnOutline}
    //     title="Outline"
    //     onClick={() => console.log("outline clicked")}
    //   />

    //   <Button
    //     className={btnStyles.btnWhite}
    //     title="White"
    //     onClick={() => console.log("white clicked")}
    //   />

    //   <Button
    //     className={btnStyles.btnPill}
    //     title="Pill"
    //     onClick={() => console.log("pill clicked")}
    //   />

    //   <Button
    //     className={btnStyles.btnGhost}
    //     title="Ghost"
    //     onClick={() => console.log("ghost clicked")}
    //   />

    //   <Button
    //     className={btnStyles.btnShadow}
    //     title="Shadow"
    //     onClick={() => console.log("shadow clicked")}
    //   />

    //   <Button
    //     className={btnStyles.btnGradient}
    //     title="Gradient"
    //     onClick={() => console.log("gradient clicked")}
    //   />

    //   <Button
    //     className={btnStyles.btn3D}
    //     title="3D Button"
    //     onClick={() => console.log("3D clicked")}
    //   />

    //   <Button
    //     className={btnStyles.btnText}
    //     title="Text Button"
    //     onClick={() => console.log("text clicked")}
    //   />

    //   <Button
    //     className={btnStyles.btnHover}
    //     title="Hover Button"
    //     onClick={() => console.log("hover clicked")}
    //   />

    //   <Button
    //     className={btnStyles.btnDanger}
    //     title="Delete"
    //     onClick={() => console.log("delete clicked")}
    //   />

    //   <Button
    //     className={btnStyles.btnSuccess}
    //     title="Success"
    //     onClick={() => console.log("success clicked")}
    //   />

    //   <Button
    //     className={btnStyles.btnDisabled}
    //     title="Disabled"
    //     onClick={() => console.log("disabled clicked")}
    //   />

    //   <Button
    //     className={btnStyles.btnRounded}
    //     title="Rounded"
    //     onClick={() => console.log("rounded clicked")}
    //   />

    //   <Button
    //     className={btnStyles.btnBorder}
    //     title="Border"
    //     onClick={() => console.log("border clicked")}
    //   />

    //   <Button
    //     className={btnStyles.btnGlow}
    //     title="Glow"
    //     onClick={() => console.log("glow clicked")}
    //   />

    //   <Button
    //     className={btnStyles.btnTransparent}
    //     title="Transparent"
    //     onClick={() => console.log("transparent clicked")}
    //   />

    //   <Button
    //     className={btnStyles.btnScale}
    //     title="Scale"
    //     onClick={() => console.log("scale clicked")}
    //   />

    //   <Button
    //     className={btnStyles.btnEffect}
    //     title="Effect"
    //     onClick={() => console.log("effect clicked")}
    //   />

    //   <Button
    //     className={btnStyles.btnLink}
    //     title="Link Button"
    //     onClick={() => console.log("link clicked")}
    //   />
    // </>
  );
}

export default App;
