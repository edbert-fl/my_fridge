import React from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
<<<<<<< HEAD
=======
// import { isAdmin } from "../../Admin";
// import { CartScreen } from "../screens/CartScreen";
// import NavigationScreen from "../screens/NavigationScreen";
>>>>>>> 80a98ce (Items in receipt)
import { useAppContext } from "./AppContext";
import AppHeader from "./AppHeader";

interface MainHeaderProps {
  title: string;
}

export const MainHeader: React.FC<MainHeaderProps> = ({ title }) => {
  const { currUser, setCurrUser } = useAppContext();

  if (currUser == null) {
    throw "Error: No user has been logged in!";
  }

  return (
    <View>
      <AppHeader
        title={title}
        onBackIcon={<Icon name="menu" size={25} color="#FFFFFF" />}
        onRightIcon={<Icon name="shopping-cart" size={25} color="#FFFFFF" />}
      />
<<<<<<< HEAD
=======
      {/* <NavigationScreen
        admin={isAdmin(authUser.uid)}
        handleSignOut={handleSignOut}
        menuVisible={menuVisible}
        setMenuVisible={(menuVisible) => setMenuVisible(menuVisible)}
      /> */}
      {/* <CartScreen /> */}
>>>>>>> 80a98ce (Items in receipt)
    </View>
  );
};
