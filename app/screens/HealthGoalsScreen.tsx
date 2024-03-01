import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../utils/Types";
import { commonStyles, theme } from "../utils/Styles";

const HealthGoalsScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const navigateToAppTab = () => {
    navigation.navigate("AppTabNavigator");
  };

  return (
    <View style={commonStyles.container}>
      <SafeAreaView style={commonStyles.safeAreaView}>
        <Text>HealthGoalsScreen</Text>
        <TouchableOpacity onPress={navigateToAppTab}>
          <Text style={{ color: theme.colors.link }}>Go next</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default HealthGoalsScreen;
