import {
    View,
    SafeAreaView,
    Text
  } from "react-native";
  import React, {  } from "react";
  import Icon from "react-native-vector-icons/MaterialIcons";
  import AppHeader from "./AppHeader";
  import NavigationScreen from "../screens/NavigationScreen";
  import { useAppContext } from "../context/AppContext";

interface MainHeaderProps {
    title: string;
}

export const MainHeader: React.FC<MainHeaderProps> = ({title}) => {
    const {menuVisible, setMenuVisible} = useAppContext()
    return (
        <SafeAreaView>
            
            <AppHeader
                title={title}
                onBackIcon={<Icon name="menu" size={25} color="#FFFFFF" />}
        //   onBackPress={() => handleOpenMenu()}
        //   onRightPress={() => handleOpenCart()}
                onRightIcon={<Icon name="shopping-cart" size={25} color="#FFFFFF" />}
            />
            <NavigationScreen menuVisible={menuVisible} setMenuVisible={(menuVisible)=> setMenuVisible(menuVisible)} />
        </SafeAreaView>
    )
}
