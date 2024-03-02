import React, { useRef, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Platform,
  ActivityIndicator,
} from "react-native";
import LottieView from "lottie-react-native";
import { theme } from "../utils/Styles";

const LoadingAnimation = () => {
  const animationRef = useRef<LottieView | null>(null);

  useEffect(() => {
    if (animationRef.current) {
      animationRef.current.play();
    }
  }, []);

  return Platform.OS === "ios" ? (
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
  ) : (
    <ActivityIndicator size="large" color={theme.colors.primary} />
  );
};

export default LoadingAnimation;
