import {
    View,
    StyleSheet,
    Dimensions,
    Animated,
  } from "react-native";
  import React, {
    useEffect,
    useRef,
    useState,
  } from "react";
  import { theme } from "../utils/Styles";
import LoadingAnimation from "./LoadingAnimation";
  
  const WINDOW_INNER_WIDTH = Dimensions.get("window").width;
  
  interface LoadingOverlayInterface {
    loading: boolean;
  }
  
  const LoadingOverlay: React.FC<LoadingOverlayInterface> = ({ loading }) => {
    const [loadingOpen, setLoadingOpen] = useState<Boolean>(false);
    const backgroundFadeAnim = useRef(new Animated.Value(0)).current;
    const ANIMATION_DURATION = 100;
  
    useEffect(() => {
      setLoadingOpen(true);
      if (loading) {
        Animated.parallel([
          Animated.timing(backgroundFadeAnim, {
            toValue: 0.7,
            duration: ANIMATION_DURATION,
            useNativeDriver: true,
          }),
        ]).start();
      } else {
        Animated.parallel([
          Animated.timing(backgroundFadeAnim, {
            toValue: 0,
            duration: ANIMATION_DURATION,
            useNativeDriver: true,
          }),
        ]).start(() => {
          setTimeout(() => {
            setLoadingOpen(false);
          }, ANIMATION_DURATION);
        });
      }
    }, [loading]);
  
    return (
      <>
        {loadingOpen ? (
          <View style={styles.container}>
            <LoadingAnimation/>
            <Animated.View
              style={{
                ...styles.overlay,
                opacity: backgroundFadeAnim,
              }}
            >
            </Animated.View>
          </View>
        ) : null}
      </>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      position: "absolute",
      height: "100%",
      width: WINDOW_INNER_WIDTH,
      zIndex: 99
    },
    overlay: {
      backgroundColor: "black",
      height: "100%",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      paddingBottom: "40%",
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "flex-end",
      marginTop: 30,
    },
    cancelButton: {
      backgroundColor: theme.colors.accent,
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      alignItems: "center",
      width: 80,
    },
    doneButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: 5,
      padding: 10,
      alignItems: "center",
      width: 80,
    },
    tableRow: {
      flexDirection: "row",
      paddingVertical: 6,
    },
    labelCell: {
      flex: 3,
      textAlign: "left",
      marginBottom: 3,
    },
  });
  
  export default LoadingOverlay;