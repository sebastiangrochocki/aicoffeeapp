import React, { useState, useRef, useEffect } from "react";
import "./style.scss";
import Img from "./Img.js";
import Img2 from "./Img2.js";
import Logo from "./Logo.js";
import Signal from "./Signal.js";
import Mobile from "./Mobile.js";
import Coffee from "./Coffee.js";
import ViewTarget from "./ViewTarget.svg";
import { Flex, IconButton } from "blocksin-system";
// import Product1 from './product1.png';
import { CaretLeft } from "@phosphor-icons/react";
import LongPressButton from "./LongPress.js";
import { Helmet } from "react-helmet";
import QrScanner from "react-qr-scanner";
import Stepper from "./Stepper.js";
import LineConnector from "./LineConnector";

const App = () => {
  const [screen, setScreen] = useState(1);
  const [screen1, setScreen1] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
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
    setCurrentStep(1);
  };

  const handleBackButtonClick3 = () => {
    setScreen(3);
    setCurrentStep(2);
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

  const handleLink = () => {
    setScreen(4);
  };

  useEffect(() => {
    if (screen === 4) {
      const timeout = setTimeout(() => {
        setScreen(5);
      }, 4000); // Set screen to 5 after 5000ms

      return () => clearTimeout(timeout);
    }
  }, [screen]);

  // const canvasRef = useRef(null);
  // const videoRef = useRef(null);
  // useEffect(() => {
  //   let stream;
  //   let intervalId;
  //   if (screen === 2) {
  //     const constraints = {
  //       video: {
  //         facingMode: "environment",
  //         width: { ideal: 1280 },
  //         height: { ideal: 720 },
  //       },
  //     };
  //     navigator.mediaDevices
  //       .getUserMedia(constraints)
  //       .then((mediaStream) => {
  //         stream = mediaStream;
  //         if (videoRef.current) {
  //           videoRef.current.srcObject = stream;
  //         }
  //         intervalId = setInterval(checkBlackScreen, 1000);
  //       })
  //       .catch((err) => console.error("Error accessing the camera: ", err));
  //   }
  //   return () => {
  //     if (stream) {
  //       stream.getTracks().forEach((track) => track.stop());
  //     }
  //     if (intervalId) {
  //       clearInterval(intervalId);
  //     }
  //   };
  // }, [screen]);

  // const checkBlackScreen = () => {
  //   if (!videoRef.current || !canvasRef.current) return;

  //   const video = videoRef.current;
  //   const canvas = canvasRef.current;
  //   const context = canvas.getContext("2d");
  //   context.drawImage(video, 0, 0, canvas.width, canvas.height);

  //   const frame = context.getImageData(0, 0, canvas.width, canvas.height);
  //   const { data } = frame;
  //   let blackPixels = 0;
  //   const totalPixels = data.length / 4;

  //   for (let i = 0; i < data.length; i += 4) {
  //     if (data[i] < 50 && data[i + 1] < 50 && data[i + 2] < 50) {
  //       blackPixels++;
  //     }
  //   }

  //   console.log(`Black pixels: ${blackPixels}, Total pixels: ${totalPixels}`);
  //   if (blackPixels / totalPixels > 0.4) {
  //     setScreen(3);
  //   }
  // };

  const [currentStep, setCurrentStep] = useState(1);
  const steps = 3;

  const handleScan = (data) => {
    if (data) {
      if (data.text === "https://sebikostudio.com/") {
        setScreen(3); // Go to screen 3 after successful scan
        setCurrentStep(2);
      } else {
        setErrorMessage("Invalid QR code. Please try again.");
      }
      // console.log(data);
    }
  };

  const handleError = (err) => {
    console.error("Error scanning QR code:", err);
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
          <div
            style={{ position: "relative", zIndex: "4", marginBottom: "auto" }}
          >
            <Img animateOut={animateOut} />
            {!screen1 && <Img2 />}
          </div>
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
          <Flex justify="between" fluid style={{ padding: "0px 24px" }}>
            <IconButton variant="ghost" onClick={handleBackButtonClick}>
              <CaretLeft size={16} weight="bold" />
            </IconButton>
            <Stepper steps={steps} currentStep={currentStep} />
            <div style={{ width: "40px", height: "40px" }}></div>
          </Flex>
          <div className="container">
            <div className="text">
              <h3>Use your phone's camera</h3>
              <p>Use your phone’s camera to scan your brewer’s QR code</p>
            </div>
          </div>
          <div className="video">
            <QrScanner
              delay={300}
              onError={handleError}
              onScan={handleScan}
              style={{ width: "100%" }}
              facingMode="environment"
            />
            <img src={ViewTarget} alt="View Target" className="view-target" />
            {/* <video ref={videoRef} autoPlay />
            <canvas ref={canvasRef} className="canvas" /> */}
          </div>
          <div className="text">
            {errorMessage && <p className="error-message">{errorMessage}</p>}
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
          <Flex justify="between" fluid style={{ padding: "0px 24px" }}>
            <IconButton variant="ghost" onClick={handleBackButtonClick2}>
              <CaretLeft size={16} weight="bold" />
            </IconButton>
            <Stepper steps={steps} currentStep={currentStep} />
            <div style={{ width: "40px", height: "40px" }}></div>
          </Flex>
          <div className="container">
            <div className="text">
              <h3>Link your brewer</h3>
              <p>
                Turn on your brewer.
                <br />
                Wait until you see the “Waiting for Connection” screen.
              </p>
            </div>
            <div className="text">
              <p>Then tap the “Link” button below.</p>
            </div>
          </div>
          <Flex
            direction="column"
            fluid
            style={{ padding: "0 24px", marginBottom: "0", marginTop: "auto" }}
            gap={200}
          >
            <button
              style={{ width: "100%" }}
              className="custom-button custom-button--solid"
              onClick={handleLink}
            >
              Link
            </button>
          </Flex>
        </div>
      )}

      {screen === 4 && (
        <div className="content screen3 content--show">
          <Flex justify="between" fluid style={{ padding: "0px 24px" }}>
            <IconButton variant="ghost" onClick={handleBackButtonClick3}>
              <CaretLeft size={16} weight="bold" />
            </IconButton>
            <Stepper steps={steps} currentStep={currentStep} />
            <div style={{ width: "40px", height: "40px" }}></div>
          </Flex>

          <div className="container">
            <div className="text">
              <h3>Linking brewer...</h3>
              <p>
                Connecting to your brewer.
                <br />
                This might take a moment.
              </p>
            </div>
          </div>

          <Flex
            fluid
            justify="between"
            align="center"
            customClass="container"
            style={{ marginTop: "32px" }}
          >
            <Mobile />
            <LineConnector time={5000} />
            <Coffee />
            <LineConnector time={0} />
            <Signal />
          </Flex>
        </div>
      )}

      {screen === 5 && (
        <div className="content screen3 content--show">
          <Flex justify="between" fluid style={{ padding: "0px 24px" }}>
            <IconButton variant="ghost" onClick={handleBackButtonClick3}>
              <CaretLeft size={16} weight="bold" />
            </IconButton>
            <Stepper steps={steps} currentStep={currentStep} />
            <div style={{ width: "40px", height: "40px" }}></div>
          </Flex>

          <div className="container">
            <div className="text">
              <h3>Brewer linked!</h3>
              <p>
                One more step to go!
                <br />
                <br />
              </p>
            </div>
          </div>

          <Flex
            fluid
            justify="between"
            align="center"
            customClass="container"
            style={{ marginTop: "32px" }}
          >
            <Mobile />
            <LineConnector time={1} />
            <Coffee />
            <LineConnector time={0} />
            <Signal />
          </Flex>
          <Flex
            direction="column"
            fluid
            style={{ padding: "0 24px", marginBottom: "0", marginTop: "auto" }}
            gap={200}
          >
            <button
              style={{ width: "100%" }}
              className="custom-button custom-button--solid"
              onClick={handleLink}
            >
              Next
            </button>
          </Flex>
        </div>
      )}
    </div>
  );
};

export default App;
