import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList, User } from "../utils/Types";
import { theme } from "../utils/Styles";
import LoadingOverlay from "../components/LoadingOverlay";
import { SERVER_URL } from "../utils/Helpers";
import axios from "axios";
import { useAppContext } from "../context/AppContext";

const RegisterScreen = () => {
  const {currUser, setCurrUser} = useAppContext();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const navigateToLoginScreen = () => {
    navigation.navigate("Login");
  };

  const navigateToHealthConditions = () => {
    navigation.navigate("HealthConditions");
  };

  const signUp = async () => {
    navigateToHealthConditions();
    setLoading(true);
    try {
      let response = null;
      response = await axios.post(`${SERVER_URL}/user/register`, {
        displayName: displayName,
        email: email,
        password: password,
        currUser: currUser,
      });
      if (response.data.user) {
        const userData = response.data.user;
        setCurrUser({
          userID: userData.id,
          username: userData.username,
          email: userData.email,
          salt: userData.salt,
          createdAt: new Date(userData.created_at),
        })
      }

    } catch (error: any) {
      console.log(error);
      alert("Registration failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    navigateToLoginScreen();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>MyFridge</Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.formContainer}
      >
        <TextInput
          value={displayName}
          style={styles.input}
          placeholder="Display Name"
          autoCapitalize="none"
          onChangeText={(text) => setDisplayName(text)}
          enablesReturnKeyAutomatically
        />
        <TextInput
          value={email}
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
          enablesReturnKeyAutomatically
        />
        <TextInput
          value={password}
          style={styles.input}
          placeholder="Password"
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          enablesReturnKeyAutomatically={true}
        />

        <View style={{ marginTop: 50 }}>
          <View style={{ flex: 1 }} />
          <TouchableOpacity style={styles.button} onPress={signUp}>
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkContainer} onPress={handleLogin}>
            <Text style={styles.text}>Already Have an account?</Text>
            <Text style={styles.link}>Login instead</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <LoadingOverlay loading={loading} />
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: theme.colors.background,
  },
  linkContainer: {
    marginTop: 50,
    height: "auto",
    display: "flex",
    alignItems: "center",
  },
  text: {
    color: theme.colors.text,
  },
  link: {
    color: theme.colors.primary,
    fontSize: 16,
  },
  logo: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 20,
    color: theme.colors.primary,
  },
  formContainer: {
    width: "100%",
  },
  input: {
    marginVertical: 10,
    height: 50,
    borderRadius: 4,
    padding: 10,
    backgroundColor: theme.colors.surface,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    padding: 15,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RegisterScreen;
