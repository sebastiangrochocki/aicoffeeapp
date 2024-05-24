import React, { useState, useRef } from "react";

const LongPressButton = ({
  children,
  length = 1000,
  onLongPress,
  style,
  ...props
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [progress, setProgress] = useState(0);
  const animationFrame = useRef(null);

  const handleMouseDown = () => {
    setIsPressed(true);
    let start = null;

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;

      setProgress(Math.min(elapsed / length, 1));

      if (elapsed < length) {
        animationFrame.current = requestAnimationFrame(animate);
      } else {
        onLongPress();
        setIsPressed(false);
        setProgress(0);
      }
    };

    animationFrame.current = requestAnimationFrame(animate);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
    setProgress(0);
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
      animationFrame.current = null;
    }
  };

  return (
    <button
      className={`custom-button ${isPressed ? "active" : ""}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      style={style}
      {...props}
    >
      <span style={{ zIndex: "4", position: "relative" }}>{children}</span>
      {isPressed && (
        <div className="progress-container">
          <div
            className="progress-bar"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      )}
    </button>
  );
};

export default LongPressButton;
