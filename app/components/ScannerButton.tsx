import { View, StyleSheet } from "react-native";
import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { theme } from "../utils/Styles";
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";

interface ScannerButtonProps {
  focused: BottomTabBarButtonProps;
}

const ScannerButton: React.FC<ScannerButtonProps> = ({ focused }) => {
  return (
    <View style={styles.iconContainer}>
        <MaterialIcons
          onPress={() => console.log("pressed")}
          name="camera"
          size={80}
          color={focused ? theme.colors.primary : theme.colors.accent}
          style={{ marginTop: 20 }}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    top: -40,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
    borderRadius: 100,
  },
});

export default ScannerButton;
