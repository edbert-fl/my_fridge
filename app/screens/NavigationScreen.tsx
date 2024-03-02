import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Modal from "react-native-modal";
import { theme } from "../utils/Styles";
import Icon from "react-native-vector-icons/MaterialIcons";
// import { useAppContext } from "../components/AppContext";

interface NavigationMenuProps {
  admin: boolean;
  menuVisible: boolean;
  setMenuVisible: (menuVisible: boolean) => void;
  handleSignOut: () => void;
}

const NavigationScreen: React.FC<NavigationMenuProps> = ({
  admin,
  menuVisible,
  setMenuVisible,
  handleSignOut,
}) => {
  const navigation = useNavigation();

  const closeMenu = () => {
    setMenuVisible(false);
  };
  const navigateHome = () => {
    // navigation.navigate("Home");
    closeMenu();
  };
  return (
    <View style={{ backgroundColor: "lightgreen" }}>
      <Modal
        isVisible={menuVisible}
        animationIn="slideInLeft"
        animationOut="slideOutLeft"
        coverScreen
        style={{ width: "100%", margin: 0 }}
        hasBackdrop
        backdropOpacity={1}
        backdropColor={theme.colors.background}
      >
        <View style={styles.menuContainer}>
          <View style={styles.menuContent}>
            <View style={styles.closeButtonContainer}>
              <TouchableOpacity onPress={closeMenu} testID="CloseButton">
                <Icon name="close" size={35} style={styles.closeButton} />
              </TouchableOpacity>
            </View>
            <View style={{ height: "55%" }}>
              <TouchableOpacity onPress={navigateHome}>
                <Text style={styles.menuItem}>Home</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  menuContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: theme.colors.primary,
  },
  menuContent: {
    width: "100%",
    padding: 20,
    borderTopRightRadius: 10,
    paddingBottom: 300,
  },
  menuItem: {
    color: theme.colors.accent,
    fontWeight: "bold",
    fontSize: 48,
    marginVertical: 5,
  },
  menuHeader: {
    color: theme.colors.text,
    fontWeight: "bold",
    fontSize: 36,
  },
  closeButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    height: "40%",
  },
  closeButton: {
    color: theme.colors.warning,
    fontSize: 36,
  },
});
export default NavigationScreen;
