import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../utils/Types';

const RegisterScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const navigateToRegisterScreen = () => {
    navigation.navigate("Login");
  };

  const navigateToHealthConditions = () => {
    navigation.navigate("HealthConditions");
  };

  return (
    <View>
      <Text>RegisterScreen</Text>
    </View>
  )
}

export default RegisterScreen