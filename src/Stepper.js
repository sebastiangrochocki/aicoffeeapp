import React from "react";
import PropTypes from "prop-types";
import "./Stepper.scss";
import { Check } from "@phosphor-icons/react";

const Stepper = ({ steps, currentStep }) => {
  const stepElements = [];
  for (let i = 1; i <= steps; i++) {
    const isCurrent = i === currentStep;
    const isCompleted = i < currentStep;

    stepElements.push(
      <React.Fragment key={i}>
        <span
          className={`step ${isCurrent ? "current" : ""} ${
            isCompleted ? "completed" : ""
          }`}
        >
          {!isCompleted && i}
          {isCompleted && <Check size={16} weight="bold"/>}
        </span>
        {i < steps && (
          <div className={`connector ${isCompleted ? "completed" : ""}`} />
        )}
      </React.Fragment>
    );
  }

  return <div className="stepper">{stepElements}</div>;
};

Stepper.propTypes = {
  steps: PropTypes.number.isRequired,
  currentStep: PropTypes.number.isRequired,
};

export default Stepper;
