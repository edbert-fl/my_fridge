import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../utils/Types";
import { commonStyles, theme } from "../utils/Styles";

const HealthConditionsScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const navigateToHealthGoals = () => {
    navigation.navigate("HealthGoals");
  };

  return (
    <View style={commonStyles.container}>
      <SafeAreaView style={commonStyles.safeAreaView}>
        <Text>HealthConditionsScreen</Text>
        <TouchableOpacity onPress={navigateToHealthGoals}>
          <Text style={{ color: theme.colors.link }}>Go next</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default HealthConditionsScreen;
