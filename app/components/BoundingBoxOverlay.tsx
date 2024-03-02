import React from "react";
import { View, StyleSheet } from "react-native";
import { BoundingBox } from "../utils/Types";
import { theme } from "../utils/Styles";

interface BoundingBoxOverlayProps {
  boundingBox: BoundingBox;
}
const BoundingBoxOverlay: React.FC<BoundingBoxOverlayProps> = ({
  boundingBox,
}) => {
  if (!boundingBox) return null;

  return (
    <>

      <View
        style={{
          width: 50,
          height: 50,
          borderTopWidth: 3,
          borderLeftWidth: 3,
          position: "absolute",
          left: boundingBox.x,
          top: boundingBox.y,
          borderLeftColor: "white",
          borderTopColor: "white",
        }}
      />
      <View
        style={{
          width: 50,
          height: 50,
          borderTopWidth: 3,
          borderRightWidth: 3,
          position: "absolute",
          right: boundingBox.x,
          top: boundingBox.y,
          borderRightColor: "white",
          borderTopColor: "white",
        }}
      />
      <View
        style={{
          width: 50,
          height: 50,
          borderBottomWidth: 3,
          borderLeftWidth: 3,
          position: 'absolute',
          left: boundingBox.x,
          top: boundingBox.y + boundingBox.height - 50,
          borderLeftColor: 'white',
          borderBottomColor: 'white'
      }}
      />
      <View
        style={{
          width: 50,
          height: 50,
          borderBottomWidth: 3,
          borderRightWidth: 3,
          position: "absolute",
          right: boundingBox.x,
          top: boundingBox.y + boundingBox.height - 50,
          borderRightColor: "white",
          borderBottomColor: "white",
        }}
      />
    </>
  );
};

export default BoundingBoxOverlay;
