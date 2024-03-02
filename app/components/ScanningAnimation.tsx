import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { theme } from '../utils/Styles';

const ScanningOverlay = () => {
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 3500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 3500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };
  
  const animatedStyles = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [-1000, 650], // Probably should change based on device
        }),
      },
    ],
  };

  return (
    <View style={styles.overlay}>
      <Animated.View style={[styles.scanningLine, animatedStyles]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
  },
  scanningLine: {
    width: '100%', 
    height: 2,
    backgroundColor: theme.colors.primary
  },
});

export default ScanningOverlay;
