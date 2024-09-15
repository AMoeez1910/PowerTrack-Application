import React from "react";
import Svg, { Rect, G, Text } from "react-native-svg";

const CustomBatterySVG = ({charge}:{charge:number}) => {
  const getColor = (charge:number) => {
    if (charge < 20) return "red";
    if (charge < 50) return "#FFCD01";
    return "#0FB23E";
  };

  return (
    <Svg height="100" width="60" viewBox="0 0 60 130">
      {/* Battery Body */}
      <Rect
        x="5"
        y="10"
        width="50"
        height="110"
        stroke="#1F1F1F"
        strokeWidth="4"
        rx="6"
        ry="6" // Rounded corners
        fill="none"
      />
      {/* Battery Tip */}
      <Rect
        x="20"
        y="0"
        width="20"
        height="10"
        fill="#1F1F1F" // Color of the battery tip
        rx="3"
        ry="3"
      />
      {/* Battery Charge */}
      <Rect
        x="7"
        y={110 - (100 * charge) / 100 + 10} // Dynamic Y position based on charge
        width="46"
        height={`${(100 * charge) / 100}`} // Dynamic height based on charge
        fill={getColor(charge)}
        rx="4"
        ry="4"
      />
      {/* Charge Percentage Text */}
      <G></G>
    </Svg>
  );
};

export default CustomBatterySVG;
