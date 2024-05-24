import React, { useState, useRef, useEffect } from "react";
import "./style.scss";
import Img from "./Img.js";
import Img2 from "./Img2.js";
import Logo from "./Logo.js";
import Signal from "./Signal.js";
import Mobile from "./Mobile.js";
import Coffee from "./Coffee.js";
import ViewTarget from "./ViewTarget.svg";
import { Flex, IconButton, Input, Switch, Toolbar } from "blocksin-system";
// import Product1 from './product1.png';
import {
  ArrowCounterClockwise,
  CaretLeft,
  LockSimple,
  WifiHigh,
} from "@phosphor-icons/react";
import LongPressButton from "./LongPress.js";
import { Helmet } from "react-helmet";
import QrScanner from "react-qr-scanner";
import Stepper from "./Stepper.js";
import LineConnector from "./LineConnector";
import Product from "./product2.png";

const generateRandomNetworkName = () => {
  const adjectives = ["Fast", "Secure", "Super", "Quick", "Reliable", "Strong"];
  const nouns = ["Net", "Link", "Wave", "Signal", "Connect", "Stream"];
  const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

  return `${getRandomElement(adjectives)}${getRandomElement(nouns)}`;
};

const networkNames = Array.from({ length: 6 }, () =>
  generateRandomNetworkName()
);

const NetworkList = ({ onNetworkClick }) => {
  return (
    <div className="card">
      <div className="item">
        <p>Network</p>
        <IconButton variant="ghost">
          <ArrowCounterClockwise size={16} weight="bold" />
        </IconButton>
      </div>
      {networkNames.map((networkName, index) => (
        <div
          className="item"
          key={index}
          onClick={() => onNetworkClick(networkName)}
        >
          <p>{networkName}</p>
          <Flex>
            <div className="icon">
              <LockSimple size={16} weight="bold" />
            </div>
            <div className="icon">
              <WifiHigh size={16} weight="bold" />
            </div>
          </Flex>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [screen, setScreen] = useState(1);
  const [screen1, setScreen1] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [animateOut, setAnimateOut] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState("");

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

  const handleBackButtonClick4 = () => {
    setScreen(4);
    setCurrentStep(2);
  };

  const handleBackButtonClick5 = () => {
    setScreen(6);
    setCurrentStep(3);
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

  const handleNext = () => {
    setScreen(6);
    setCurrentStep(3);
  };

  const handleNetworkClick = (networkName) => {
    setSelectedNetwork(networkName);
    setShowDialog(true);
  };

  const handleFinish = () => {
    setScreen(8);
  };

  useEffect(() => {
    if (screen === 4) {
      const timeout = setTimeout(() => {
        setScreen(5);
      }, 4000); // Set screen to 5 after 5000ms

      return () => clearTimeout(timeout);
    }
  }, [screen]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (screen === 7) {
      const successTimeout = setTimeout(() => {
        setShowSuccessMessage(true);
      }, 6000); // Show success message after 6000ms

      return () => clearTimeout(successTimeout);
    }
  }, [screen]);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    const appElement = document.querySelector(".app");
    if (darkMode) {
      appElement.classList.add("darkmode");
    } else {
      appElement.classList.remove("darkmode");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const [currentStep, setCurrentStep] = useState(1);
  const steps = 3;

  const handleScan = (data) => {
    // setErrorMessage("");

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
    <Flex
      direction="column"
      align="center"
      justify="center"
      fluid
      style={{ minHeight: "100%", height: "100%" }}
      customClass="appWrapper customTheme"
    >
      <Toolbar>
        <Switch
          checked={darkMode}
          id="darkmode"
          onCheckedChange={(checked) => {
            setDarkMode(checked);
            localStorage.setItem("darkMode", checked);
          }}
        >
          darkmode
        </Switch>
        {screen === 2 && (
          <button
            style={{}}
            className="custom-button custom-button--solid custom-button--small"
            onClick={() => setScreen(3)}
          >
            Apply QR code
          </button>
        )}
      </Toolbar>

      <div className="app customTheme darkmode">
        <Helmet>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Helmet>
        {screen === 1 && (
          <div
            className={`content splashscreen ${animateOut ? "animate1" : ""}`}
          >
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
              style={{
                position: "relative",
                zIndex: "4",
                marginBottom: "auto",
              }}
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
                    <p className="large">
                      Control Your Touch-less coffee maker
                    </p>
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
              style={{
                padding: "0 24px",
                marginBottom: "0",
                marginTop: "auto",
              }}
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
                <p style={{ textAlign: "left" }}>
                  <ol>
                    <li>Turn on your brewer.</li>
                    <li>
                      Wait until you see the “Waiting for Connection” screen.
                    </li>
                  </ol>
                </p>
              </div>
            </div>
            <div className="container">
              <img
                src={Product}
                alt="Product"
                style={{ width: "100%", borderRadius: "8px" }}
              />
              <div className="text">
                <p style={{ textAlign: "left" }}>
                  <ol start="3">
                    <li>Then tap the “Link” button below. </li>
                  </ol>
                </p>
              </div>
            </div>

            <Flex
              direction="column"
              fluid
              style={{
                padding: "0 24px",
                marginBottom: "0",
                marginTop: "auto",
              }}
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
              style={{
                padding: "0 24px",
                marginBottom: "0",
                marginTop: "auto",
              }}
              gap={200}
            >
              <button
                style={{ width: "100%" }}
                className="custom-button custom-button--solid"
                onClick={handleNext}
              >
                Next
              </button>
            </Flex>
          </div>
        )}

        {screen === 6 && (
          <div className="content screen3 content--show">
            <Flex justify="between" fluid style={{ padding: "0px 24px" }}>
              <IconButton variant="ghost" onClick={handleBackButtonClick4}>
                <CaretLeft size={16} weight="bold" />
              </IconButton>
              <Stepper steps={steps} currentStep={currentStep} />
              <div style={{ width: "40px", height: "40px" }}></div>
            </Flex>

            <div className="container">
              <div className="text">
                <h3>
                  Connect your brewer
                  <br />
                  to your Wi-Fi
                </h3>
                <p>
                  Select the Wi-Fi network you would like to connect to, and
                  enter password.
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
              <NetworkList onNetworkClick={handleNetworkClick} />
            </Flex>
            <Flex
              direction="column"
              fluid
              style={{
                padding: "0 24px",
                marginBottom: "0",
                marginTop: "auto",
              }}
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

        {screen === 7 && (
          <div className="content screen3 content--show">
            <Flex justify="between" fluid style={{ padding: "0px 24px" }}>
              <IconButton variant="ghost" onClick={handleBackButtonClick5}>
                <CaretLeft size={16} weight="bold" />
              </IconButton>
              <Stepper steps={steps} currentStep={currentStep} />
              <div style={{ width: "40px", height: "40px" }}></div>
            </Flex>

            <div className="container">
              {!showSuccessMessage && (
                <div className="text">
                  <h3>You are almost there!</h3>
                  <p>
                    Connecting your brewer to your Wi-Fi...
                    <br />
                    <br />
                  </p>
                </div>
              )}
              {showSuccessMessage && (
                <div className="text">
                  <h3>Success!</h3>
                  <p>
                    Your AiCoffee Brewer is now connected!
                    <br />
                    <br />
                  </p>
                </div>
              )}
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
              <LineConnector time={6000} />
              <Signal />
            </Flex>
            <Flex
              direction="column"
              fluid
              style={{
                padding: "0 24px",
                marginBottom: "0",
                marginTop: "auto",
              }}
              gap={200}
            >
              {!showSuccessMessage && (
                <button
                  style={{ width: "100%" }}
                  className="custom-button custom-button--ghost"
                >
                  Need help?
                </button>
              )}
              {showSuccessMessage && (
                <button
                  style={{ width: "100%" }}
                  className="custom-button custom-button--solid"
                  onClick={handleFinish}
                >
                  Finish
                </button>
              )}
            </Flex>
          </div>
        )}

        {screen === 8 && (
          <div className="content screen3 content--show">
            <Flex
              direction="column"
              fluid
              style={{
                padding: "0 24px",
                height: "100%",
              }}
              gap={200}
              justify="center"
              align="center"
            >
              <div className="container">
                <Logo />
                <div className="text" style={{ marginTop: "32px", gap: "8px" }}>
                  <h2>Thank You 🙏</h2>
                </div>
              </div>
            </Flex>
          </div>
        )}

        {showDialog && (
          <div className="dialog">
            <div className="card">
              <div className="text">
                <h3>Enter the password for {selectedNetwork}</h3>
              </div>

              <Flex
                direction="column"
                fluid
                style={{
                  marginBottom: "0",
                  marginTop: "24px",
                }}
                gap={200}
              >
                <Input
                  fluid
                  type="password"
                  label="Wi-Fi password"
                  placeholder="Enter password"
                />
                <button
                  style={{ width: "100%" }}
                  className="custom-button custom-button--solid"
                  onClick={() => {
                    setScreen(7);
                    setCurrentStep(3);
                    setShowDialog(false);
                  }}
                >
                  Confirm
                </button>
                <button
                  style={{ width: "100%" }}
                  className="custom-button custom-button--outline"
                  onClick={() => setShowDialog(false)}
                >
                  Cancel
                </button>
              </Flex>

              <Flex
                direction="column"
                fluid
                style={{
                  marginBottom: "0",
                  marginTop: "48px",
                }}
                gap={200}
              >
                <button
                  style={{ width: "100%" }}
                  className="custom-button custom-button--ghost"
                  onClick={() => setShowDialog(false)}
                >
                  Can't find password?
                </button>
              </Flex>
            </div>
          </div>
        )}
      </div>
    </Flex>
  );
};

export default App;
