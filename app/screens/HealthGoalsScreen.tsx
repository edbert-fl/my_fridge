import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList, User } from "../utils/Types";
import { commonStyles, theme } from "../utils/Styles";
import Icon from "react-native-vector-icons/MaterialIcons";

const HealthGoalsScreen = () => {
  const [goals, setGoals] = useState<String[]>(["Lose Weight", "Eat Healthy", "Bulk up"]);
  const [usersGoal, setUsersGoal] = useState<String | null>(null);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [tempCurrUser, setTempCurrUser] = useState<User>({
    userID: 69,
    username: "Mary Jane",
    email: "mary.jane@gmail.com",              
    salt: "some_salt",
    createdAt: new Date(),
    healthConditions: null,
    healthGoals:  null,
  });

  const navigateToHomePage = () => {
    navigation.navigate("HealthGoals");
  };

  const toggleGoal = (goal: String) => {
    if (goal === usersGoal) {
      setUsersGoal(null);
      return;
    }
    setUsersGoal(goal);
  };
  

  const doseUserHaveGoal = (goal: String) => {
    if (goal === usersGoal)
      return true;
    return false;
  };

  return (
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
        <TouchableOpacity style={styles.button} onPress={navigateToHomePage}>
        {usersGoal === null ? (
            <Text style={styles.buttonText}>I'm not sure yet</Text>
          ) : (
            <Text style={styles.buttonText}>Next</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
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
    padding: 10
  },
});

export default HealthGoalsScreen;
