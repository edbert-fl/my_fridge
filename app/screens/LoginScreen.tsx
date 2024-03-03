import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../utils/Types";
import { commonStyles, theme } from "../utils/Styles";
import axios from "axios";
import { SERVER_URL } from "../utils/Helpers";
import { useAppContext } from "../context/AppContext";
import LoadingOverlay from "../components/LoadingOverlay";

const Login = () => {
  const { setCurrUser } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const navigateToRegisterScreen = () => {
    navigation.navigate("Register");
  };

  const navigateToHealthConditions = () => {
    navigation.navigate("HealthConditions");
  };

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${SERVER_URL}/user/login`, {
        email: email,
        password: password,
      });
      const userData = response.data.user;
      setCurrUser({
        userID: userData.userid,
        username: userData.username,
        email: userData.email,
        salt: userData.salt,
        createdAt: new Date(userData.createdAt),
      });
      console.log(userData);
    } catch (error) {
      alert(`Error signing in ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = () => {
    navigateToRegisterScreen();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>MyFridge</Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.formContainer}
      >
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
          <TouchableOpacity style={styles.button} onPress={signIn}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <View style={{ flex: 1 }} />
          <TouchableOpacity style={styles.linkContainer} onPress={handleSignUp}>
            <Text style={styles.text}>Don't have an account?</Text>
            <Text style={styles.registerInstead}>Sign up instead</Text>
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
  registerInstead: {
    color: theme.colors.placeholderText,
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
    alignItems: "center",
  },
  secondaryButton: {
    backgroundColor: theme.colors.accent,
    borderRadius: 5,
    padding: 15,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  guestLoginButton: {
    backgroundColor: theme.colors.success,
    borderRadius: 5,
    padding: 15,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Login;
