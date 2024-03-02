import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../utils/Types";
import { commonStyles, theme } from "../utils/Styles";

const Login = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const navigateToRegisterScreen = () => {
    navigation.navigate("Register");
  };

  const navigateToHealthConditions = () => {
    navigation.navigate("HealthConditions");
  };

  return (
    <View style={commonStyles.container}>
      <SafeAreaView style={commonStyles.safeAreaView}>
        <Text>Login</Text>
        <TouchableOpacity onPress={navigateToHealthConditions}>
          <Text style={{ color: theme.colors.link }}>Go next</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default Login;
