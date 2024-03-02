import React, { useRef, useEffect } from "react";
import { Platform, ActivityIndicator, Text } from "react-native";
import LottieView from "lottie-react-native";
import { theme } from "../utils/Styles";

const LoadingAnimation = () => {
  const animationRef = useRef<LottieView | null>(null);

  useEffect(() => {
    if (animationRef.current) {
      animationRef.current.play();
    }
  }, []);

  return (
    <>
      <LottieView
        ref={(animation) => (animationRef.current = animation)}
        source={require("../../assets/animations/LoadingAnimation.json")}
        style={{
          position: "absolute",
          zIndex: 2,
          top: 150,
          width: 350,
          height: 350,
        }}
        loop={true}
      />
    </>
  );
};

export default LoadingAnimation;
