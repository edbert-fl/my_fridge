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

const HealthConditionsScreen = () => {
  const [conditions, setConditions] = useState<String[]>([
    "Diabetes",
    "Hypertension",
    "Obesity",
  ]);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {tempCurrUser, setTempCurrUser} = useAppContext();

  const navigateToHealthGoals = () => {
    navigation.navigate("HealthGoals");
  };

  const toggleCondition = (condition: String) => {
    if (tempCurrUser === null) {
      throw new Error("No user found");
    }

    if (tempCurrUser.healthConditions == null) {
      setTempCurrUser({ ...tempCurrUser, healthConditions: [condition] });
      return;
    }

    if ((tempCurrUser.healthConditions as String[]).includes(condition)) {
      const updatedConditions = tempCurrUser.healthConditions.filter(
        (item: String) => item !== condition
      );
      setTempCurrUser({ ...tempCurrUser, healthConditions: updatedConditions });
    } else {
      const updatedConditions = [...tempCurrUser.healthConditions, condition];
      setTempCurrUser({ ...tempCurrUser, healthConditions: updatedConditions });
    }
  };

  const doesUserHaveCondition = (condition: String) => {
    if (tempCurrUser === null) {
      throw new Error("No user found");
    }

    if (tempCurrUser.healthConditions == null) {
      return false;
    }

    if (tempCurrUser.healthConditions.includes(condition)) {
      return true;
    }
    return false;
  };

  return (
    <SafeAreaView style={commonStyles.safeAreaView}>
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>
            Do you have any of these conditions?
          </Text>
        </View>
        {conditions.map((condition: String) => (
          <TouchableOpacity
            style={styles.selectConditionButton}
            onPress={() => toggleCondition(condition)}
            key={conditions.indexOf(condition)}
          >
            <View style={styles.selectConditionContainer}>
              <Text style={styles.text}>{condition}</Text>
              {doesUserHaveCondition(condition) == true ? (
                <Icon name="check" size={32} color={theme.colors.primary} />
              ) : (
                <Icon name="check" size={32} color="transparent" />
              )}
            </View>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.button} onPress={navigateToHealthGoals}>
          {(tempCurrUser as User).healthConditions === null ||
          (tempCurrUser as User).healthConditions?.length === 0 ? (
            <Text style={styles.buttonText}>None of these apply</Text>
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
  selectConditionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectConditionButton: {
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

export default HealthConditionsScreen;
