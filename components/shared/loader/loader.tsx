import React from "react";

export const Loader = () => {
  const bars = Array.from({ length: 12 });

  return (
    <div className="relative" style={{ width: 4, height: 12 }}>
      {bars.map((_, i) => {
        const angle = (360 / 12) * i;
        return (
          <div
            key={i}
            className="loader-ray"
            style={
              {
                transform: `rotate(${angle}deg) translate(-50%, -${
                  48 / 2 - 12 / 2
                }px)`,
                width: 4,
                height: 12,
                animationDelay: `${i * 0.1}s`,
                backgroundColor: "#D9D9D9",
                "--active-color": "#E01F27"
              } as React.CSSProperties
            }
          />
        );
      })}
    </div>
  );
};
