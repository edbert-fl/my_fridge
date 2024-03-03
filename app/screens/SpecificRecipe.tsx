import React, { useState } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { theme } from "../utils/Styles";
import { AntDesign } from "@expo/vector-icons";
const SpecificRecipe = ({ mealDetail, setSpecifyRecipe }) => {
  const { img, ingredients, instructions, caloriesPerServing, servings, name } =
    mealDetail;
  let instructionList = instructions.split(".");
  instructionList = instructionList.slice(0, -1);
  const calories = caloriesPerServing * servings;
  const [content, setContent] = useState<string>("instructions");
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setSpecifyRecipe(false)}>
          <AntDesign
            name="left"
            size={24}
            color="black"
            style={{ marginTop: 60 }}
          />
        </TouchableOpacity>
        <Text style={styles.heading}>
          {name} ({calories} cals)
        </Text>
      </View>

      <Image style={styles.mainImage} source={{ uri: img }} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={{
            ...styles.button,
            ...(content === "ingredients" && styles.focusedButton),
          }}
          onPress={() => {
            setContent("ingredients");
          }}
        >
          <Text
            style={{
              ...styles.buttonColor,
              ...(content === "ingredients" && { color: "white" }),
            }}
          >
            Ingredients
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.button,
            ...(content === "instructions" && styles.focusedButton),
          }}
          onPress={() => {
            setContent("instructions");
          }}
        >
          <Text
            style={{
              ...styles.buttonColor,
              ...(content === "instructions" && { color: "white" }),
            }}
          >
            Instructions
          </Text>
        </TouchableOpacity>
      </View>
      {content === "instructions" ? (
        <View style={styles.textContainer}>
          {instructionList.map((instruction, index) => {
            return (
              <View style={styles.sentenceContainer}>
                <View style={styles.numberContainer}>
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    {index + 1}
                  </Text>
                </View>
                <View style={styles.descContainer}>
                  <Text style={styles.textStyle}>{instruction}</Text>
                </View>
              </View>
            );
          })}
        </View>
      ) : (
        <View style={styles.textContainer}>
          {ingredients.map((ingredient, index) => {
            return (
              <View style={styles.sentenceContainer}>
                <View style={styles.numberContainer}>
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    {index + 1}
                  </Text>
                </View>
                <View style={styles.descContainer}>
                  <Text style={styles.textStyle}>
                    {ingredient.replace(/^./, ingredient[0].toUpperCase())}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    color: "green",
    fontWeight: "700",
    fontSize: 25,
    alignSelf: "center",
    marginLeft: 10,
    marginTop: 60,
    padding: 20,
  },
  mainImage: {
    width: "100%",
    height: 250,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: 30,
    marginTop: 20,
  },
  button: {
    width: "40%",
    height: 45,
    borderColor: "green",
    backgroundColor: "white",
    borderRadius: 15,
    borderWidth: 2,
  },
  buttonColor: {
    color: "green",
    fontWeight: "bold",
    fontSize: 17,
    padding: 10,
    textAlign: "center",
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    gap: 30,
    paddingHorizontal: 20,
  },
  sentenceContainer: {
    flexDirection: "row",
    alignItems: "flex-start", // Align items at the start of the cross axis
    marginBottom: 20,
    alignSelf: "center",
    width: "90%",
  },

  numberContainer: {
    backgroundColor: "green",
    width: 40,
    height: 40,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center", // Align number vertically in the middle
  },
  textStyle: {
    color: "green",
    fontSize: 18,
    textAlignVertical: "center",
  },
  descContainer: {
    width: "90%",
    alignSelf: "center",
    marginLeft: 20,
    justifyContent: "center",
  },
  focusedButton: {
    backgroundColor: "green",
    borderColor: "white",
  },
  editButton: {
    backgroundColor: "#8bd78b",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "90%",

    // height:200,
    // width:200
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
    // marginTop: 20,
    width: "100%",
  },
});
export default SpecificRecipe;
