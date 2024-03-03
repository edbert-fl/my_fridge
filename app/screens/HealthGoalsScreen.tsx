import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList, User } from "../utils/Types";
import { commonStyles, theme } from "../utils/Styles";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useAppContext } from "../context/AppContext";
import { SERVER_URL } from "../utils/Helpers";
import axios from "axios";
import LoadingOverlay from "../components/LoadingOverlay";

const HealthGoalsScreen = () => {
  const [goals, setGoals] = useState<String[]>([
    "Lose Weight",
    "Eat Healthy",
    "Bulk up",
  ]);
  const [usersGoal, setUsersGoal] = useState<String | null>(null);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { tempCurrUser, setCurrUser } = useAppContext();
  const [loading, setLoading] = useState(false);

  const navigateToHomePage = () => {
    navigation.navigate("AppTabNavigator");
  };

  const toggleGoal = (goal: String) => {
    if (goal === usersGoal) {
      setUsersGoal(null);
      return;
    }
    setUsersGoal(goal);
  };

  const doseUserHaveGoal = (goal: String) => {
    if (goal === usersGoal) return true;
    return false;
  };

  const handleRegistration = async () => {
    setLoading(true);
    if (tempCurrUser === null) {
      throw new Error("TempCurrUser does not exist!");
    }

    try {
      let response = null;
      response = await axios.post(`${SERVER_URL}/user/register`, {
        username: tempCurrUser.username,
        email: tempCurrUser.email,
        password: tempCurrUser.password,
        healthGoals: tempCurrUser.healthGoals,
        healthConditions: tempCurrUser.healthConditions,
      });
      if (response.data.user) {
        const userData = response.data.user;
        setCurrUser({
          userID: userData.userid,
          username: userData.username,
          email: userData.email,
          salt: userData.salt,
          createdAt: new Date(userData.created_at),
        });
      }
    } catch (error: any) {
      console.log(error);
      alert("Registration failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SafeAreaView style={commonStyles.safeAreaView}>
        <View style={styles.container}>
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>What is your goal?</Text>
          </View>
          {goals.map((goal: String) => (
            <TouchableOpacity
              style={styles.selectGoalButton}
              onPress={() => toggleGoal(goal)}
              key={goals.indexOf(goal)}
            >
              <View style={styles.selectGoalContainer}>
                <Text style={styles.text}>{goal}</Text>
                {doseUserHaveGoal(goal) == true ? (
                  <Icon name="check" size={32} color={theme.colors.primary} />
                ) : (
                  <Icon name="check" size={32} color="transparent" />
                )}
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.button} onPress={handleRegistration}>
            {usersGoal === null ? (
              <Text style={styles.buttonText}>I'm not sure yet</Text>
            ) : (
              <Text style={styles.buttonText}>Next</Text>
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <LoadingOverlay loading={loading} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 150,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderWidth: 0,
    borderRadius: 10,
    fontWeight: "500",
    marginHorizontal: 0,
  },
  selectGoalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectGoalButton: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: "100%",
    height: 60,
    alignItems: "stretch",
    justifyContent: "center",
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    padding: 15,
    marginTop: 70,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 32,
    fontWeight: "400",
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
  },
  headingContainer: {
    marginBottom: 30,
    padding: 10,
  },
});

export default HealthGoalsScreen;
