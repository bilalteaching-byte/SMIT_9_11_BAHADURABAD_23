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

function Stopwatch() {
  const [ms, setMs] = useState(0);
  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(0);
  const [hour, setHour] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      console.log("interval chal raha he")
      let now = new Date();
      setMin(now.getMinutes());
      setSec(now.getSeconds());
      setMs(now.getMilliseconds());
      setHour(now.getHours());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Text title={"StopWatch"} size={fontSizes.huge} />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text title={hour} size={fontSizes.huge} />
        <Text title={":"} size={fontSizes.huge} />
        <Text title={min} size={fontSizes.huge} />
        <Text title={":"} size={fontSizes.huge} />
        <Text title={sec} size={fontSizes.huge} />
        {/* <Text title={":"} size={fontSizes.huge} />
        <Text title={ms} size={fontSizes.huge} /> */}
      </div>
      {/* <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button title={"Start"} className={btnStyles.btnSuccess} />
        <Button title={"Stop"} className={btnStyles.btnDanger} />
      </div> */}
    </div>
  );
}

export default Stopwatch;
