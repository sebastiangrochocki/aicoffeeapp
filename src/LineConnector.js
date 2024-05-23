import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./LineConnector.scss";
import { Flex } from "blocksin-system";
import { Check } from "@phosphor-icons/react";
const LineConnector = ({ time }) => {
  const [currentCircle, setCurrentCircle] = useState(0);
  const [showFinalCircle, setShowFinalCircle] = useState(false);

  useEffect(() => {
    if (time === 0) {
      return;
    } else if (time === 1) {
      setShowFinalCircle(true);
      return;
    }

    const interval = setInterval(() => {
      setCurrentCircle((prev) => (prev < 3 ? prev + 1 : 0));
    }, 500);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setShowFinalCircle(true);
    }, time);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [time]);

  return (
    <div className="line-connector">
      {!showFinalCircle ? (
        Array.from({ length: 4 }).map((_, index) => (
          <Flex
            align="center"
            justify="center"
            style={{ width: "12px", height: "12px" }}
          >
            <div
              key={index}
              className={`circle ${
                time !== 0 && currentCircle === index ? "active" : ""
              }`}
            ></div>
          </Flex>
        ))
      ) : (
        <div className="final-circle">
          <span>
            <Check size={16} weight="bold" />
          </span>
        </div>
      )}
    </div>
  );
};

LineConnector.propTypes = {
  time: PropTypes.number.isRequired,
};

export default LineConnector;
