import React, { useState } from "react";
import "./style.scss";
import Img from "./Img.js";
import { Flex, IconButton } from "blocksin-system";
// import Product1 from './product1.png';
import { CaretLeft } from "@phosphor-icons/react";

const LongPressButton = ({
  children,
  length = 1000,
  onLongPress,
  style,
  ...props
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [progress, setProgress] = useState(0);
  const [animationFrame, setAnimationFrame] = useState(null);

  const handleMouseDown = () => {
    setIsPressed(true);
    let start = null;

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;

      setProgress(Math.min(elapsed / length, 1));

      if (elapsed < length) {
        setAnimationFrame(requestAnimationFrame(animate));
      } else {
        onLongPress();
      }
    };

    setAnimationFrame(requestAnimationFrame(animate));
  };

  const handleMouseUp = () => {
    setIsPressed(false);
    setProgress(0);
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
      setAnimationFrame(null);
    }
  };

  return (
    <button
      className={`custom-button ${isPressed ? "active" : ""}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={style}
      {...props}
    >
      {children}
      {isPressed && (
        <div className="progress-bar" style={{ width: `${progress * 100}%` }} />
      )}
    </button>
  );
};

const App = () => {
  const [screen, setScreen] = useState(1);
  const [screen1, setScreen1] = useState(true);

  const [animateOut, setAnimateOut] = useState(false);

  const handleLongPress = () => {
    setAnimateOut(true);
    setTimeout(() => {
      setScreen1(false);
    }, 800); // Change the screen after 600ms delay
  };

  const handleButtonClick = () => {
    setScreen(2);
  };

  const handleBackButtonClick = () => {
    if (screen === 2) {
      setScreen(1);
    } else {
      setAnimateOut(false);
      setTimeout(() => {
        setScreen1(true);
      }, 800); // Change the screen after 600ms delay
    }
  };

  return (
    <div className="app darkmode">
      {screen === 1 && (
        <div className={`content splashscreen ${animateOut ? "animate1" : ""}`}>
          {/* {!screen1 && ( */}
          <div
            className={`flex flex-column fluid screen2 ${
              animateOut ? "animate1" : ""
            }`}
          >
            <Flex fluid style={{ padding: "0px 24px" }}>
              <IconButton variant="ghost" onClick={handleBackButtonClick}>
                <CaretLeft size={16} weight="bold" />
              </IconButton>
            </Flex>
            <div
              className="text"
              style={{
                marginTop: "24px",
                padding: "0 24px",
                marginBottom: "44px",
              }}
            >
              <h3>Identify Your Brewer</h3>
              <p>
                Scan QR code on the back of your AiCoffee maker or find your
                AiCoffee maker in the list of available devices
              </p>
            </div>
          </div>
          {/* )} */}
          <Img animateOut={animateOut} />
          {/* <img src={Img} alt="Coffee Maker" className="image" /> */}
          {screen1 && (
            <div
              className={`flex flex-column fluid screen1 ${
                animateOut ? "animate1" : ""
              }`}
            >
              <Flex
                direction="column"
                fluid
                gap={800}
                customClass="container"
                style={{ marginBottom: "32px" }}
              >
                <div className="text">
                  <h1>Make Life Smooth With AiCoffee</h1>
                  <p className="large">Control Your Touch-less coffee maker</p>
                </div>
                <LongPressButton
                  style={{ width: "100%" }}
                  length={1}
                  onLongPress={handleLongPress}
                >
                  Connect
                </LongPressButton>
              </Flex>
            </div>
          )}
          {!screen1 && (
            <div className={`screen2 ${animateOut ? "animate1" : ""}`}>
              <Flex
                direction="column"
                fluid
                style={{ padding: "0 24px", marginBottom: "0" }}
                gap={200}
              >
                <button
                  style={{ width: "100%" }}
                  className="custom-button"
                  onClick={handleButtonClick}
                >
                  Scan QR code
                </button>
                <button
                  style={{ width: "100%" }}
                  className="custom-button custom-button--outline"
                >
                  Connect via Wi-Fi
                </button>
              </Flex>
            </div>
          )}
        </div>
      )}

      {screen === 2 && (
        <div className="content content--show">
          <Flex>
            <IconButton variant="ghost" onClick={handleBackButtonClick}>
              <CaretLeft size={16} weight="bold" />
            </IconButton>
          </Flex>
          <h1>Use your phone's camera</h1>
        </div>
      )}
    </div>
  );
};

export default App;
