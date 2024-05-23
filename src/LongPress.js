import React, { useState } from "react";

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
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
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

export default LongPressButton;
