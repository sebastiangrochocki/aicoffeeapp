import React, { useState, useRef, useEffect } from "react";
import "./style.scss";
import Img from "./Img.js";
import Logo from "./Logo.js";
import { Flex, IconButton } from "blocksin-system";
// import Product1 from './product1.png';
import { CaretLeft } from "@phosphor-icons/react";
import LongPressButton from "./LongPress.js";
import { Helmet } from "react-helmet";

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

  const handleBackButtonClick2 = () => {
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

  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  useEffect(() => {
    let stream;
    let intervalId;
    if (screen === 2) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((mediaStream) => {
          stream = mediaStream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
          intervalId = setInterval(checkBlackScreen, 1000);
        })
        .catch((err) => console.error("Error accessing the camera: ", err));
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [screen]);

  const checkBlackScreen = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const frame = context.getImageData(0, 0, canvas.width, canvas.height);
    const { data } = frame;
    let blackPixels = 0;
    const totalPixels = data.length / 4;

    for (let i = 0; i < data.length; i += 4) {
      if (data[i] < 50 && data[i + 1] < 50 && data[i + 2] < 50) {
        blackPixels++;
      }
    }

    console.log(`Black pixels: ${blackPixels}, Total pixels: ${totalPixels}`);
    if (blackPixels / totalPixels > 0.4) {
      setScreen(3);
    }
  };

  return (
    <div className="app darkmode">
            <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
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
                  <Flex
                    align="center"
                    fluid
                    justify="center"
                    style={{ marginBottom: "24px" }}
                  >
                    <Logo />
                  </Flex>

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
        <div className="content screen3 content--show">
          <Flex fluid style={{ padding: "0px 24px" }}>
            <IconButton variant="ghost" onClick={handleBackButtonClick}>
              <CaretLeft size={16} weight="bold" />
            </IconButton>
          </Flex>
          <div className="container">
            <div className="text">
              <h3>Use your phone's camera</h3>
              <p>Use your phone’s camera to scan your brewer’s QR code</p>
            </div>
          </div>
          <div className="video">
            <video ref={videoRef} autoPlay />
            <canvas ref={canvasRef} className="canvas" />
          </div>
          <Flex
            direction="column"
            fluid
            style={{ padding: "0 24px", marginBottom: "0", marginTop: "auto" }}
            gap={200}
          >
            <button
              style={{ width: "100%" }}
              className="custom-button custom-button--ghost"
            >
              Need help?
            </button>
          </Flex>
        </div>
      )}

      {screen === 3 && (
        <div className="content screen3 content--show">
          <Flex fluid style={{ padding: "0px 24px" }}>
            <IconButton variant="ghost" onClick={handleBackButtonClick2}>
              <CaretLeft size={16} weight="bold" />
            </IconButton>
          </Flex>
          <div className="container">
            <div className="text">
              <h3>Link your brewer</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
