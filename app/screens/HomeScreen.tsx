import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { rotdList } from "../utils/defaultGoals";
import Icon from "react-native-vector-icons/MaterialIcons";
import { data } from "../utils/defaultGoals";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { theme } from "../utils/Styles";
import { Item, ScannerParamList, TabParamList } from "../utils/Types";
import DefaultRecipes from "./DefaultRecipes";
import SpecificRecipe from "./SpecificRecipe";
import { demoItems } from "../utils/Helpers";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAppContext } from "../context/AppContext";

const Stack = createNativeStackNavigator();
const HomeScreen = () => {
  const [fridgeItems, setFridgeItems] = useState<Item[]>([]);
  const [popularRecipesPressed, setPopularsPressed] = useState<boolean>(false);
  const [currentPopularRecipe, setCurrentPopularRecipe] = useState<any>({});
  const [recipeGoal, setRecipeGoal] = useState<string>("");
  const [rotd, setRotd] = useState<any>({});
  const [viewRotd, setViewRotd] = useState(false);
  const {currUser} = useAppContext();
  // make new feature to scan nutrition value as well.
  useEffect(() => {
    const index = Math.floor(Math.random() * rotdList.length);
    setRotd(rotdList[index]);
    console.log(rotdList[index]);
  }, []);

  const navigation = useNavigation<StackNavigationProp<ScannerParamList>>();

  const handleItemCardPress = (itemID: number) => {
    navigation.navigate("ItemScreen", {itemID: itemID, justAdded: false});
  }

  const handleGoToAllItems = (itemID: number) => {
    navigation.navigate("ItemsInReceipt", {receiptID: undefined});
  }

  const currImg = (goal: string) =>
    goal === "Lose Weight" ? (
      <Image
        source={require("../../assets/loseweight_bg.jpg")}
        style={styles.itemImage}
      />
    ) : goal === "Gain Muscle/Bulking" ? (
      <Image
        source={require("../../assets/bulking_bg.jpg")}
        style={styles.itemImage}
      />
    ) : (
      <Image
        source={require("../../assets/diseaseprevention_bg.jpg")}
        style={styles.itemImage}
      />
    );
  if (popularRecipesPressed) {
    return (
      <DefaultRecipes
        currentPopularRecipe={currentPopularRecipe}
        setPopularsPressed={setPopularsPressed}
        recipeGoal={recipeGoal}
      />
    );
  }
  if (viewRotd) {
    return <SpecificRecipe mealDetail={rotd} setSpecifyRecipe={setViewRotd} />;
  }
  return (
    <ScrollView style={{ marginTop: 40 }}>
      <TouchableOpacity
        style={[styles.promotionalArtContainer, { width: 330, marginRight: 5 }]}
        onPress={() => setViewRotd(true)}
      >
        <View style={styles.secondaryOpacity} />
        <Image
          source={require("../../assets/rotd_placeholder.jpg")}
          style={[styles.itemImage, { opacity: 0.3 }]}
        />
        <Text
          style={[
            styles.goalHeading,
            {
              color: "beige",
              fontSize: 40,
              padding: 3,
              alignSelf: "center",
              justifyContent: "center",
              zIndex: 3,
            },
          ]}
        >
          RECIPE OF
        </Text>
        <Text
          style={[
            styles.goalHeading,
            {
              color: "white",
              fontSize: 40,
              padding: 3,
              alignSelf: "center",
              justifyContent: "center",
              zIndex: 3,
            },
          ]}
        >
          THE DAY
        </Text>
      </TouchableOpacity>
      <Text style={styles.heading}>Your Fridge</Text>
      <View style={styles.categories}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: "row" }}>
            {demoItems.map((item: Item) => (
              <TouchableOpacity
                key={item.itemID}
                onPress={() => handleItemCardPress(item.itemID)}
              >
                <View style={styles.fridgeItemContainer}>
                  <Text style={styles.itemLabel}>{item.name}</Text>
                  <Image src={item.art} style={styles.fridgeImage} />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.itemScrollEnd}>
            <TouchableOpacity>
              <View style={styles.itemScrollEndCircle}>
                <Icon
                  style={{ alignSelf: "center" }}
                  name="arrow-forward"
                  size={50}
                  color="#FFFFFF"
                />
              </View>
              <Text style={styles.itemScrollEndText}>All Items</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <Text style={[styles.heading, { bottom: 40 }]}>
        Popular recipes right now
      </Text>
      <View style={{ display: "flex", bottom: 100, height: 300 }}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {data.length === 0 ? (
            <View style={styles.promosContainer}>
              <View style={styles.promotionalArtContainer}>
                <Image
                  source={require("../../assets/bulking_bg.jpg")}
                  style={styles.itemImage}
                />
                <Text style={styles.heading}>Promotion now</Text>
              </View>
              <View style={styles.promotionalArtContainer}>
                <Text style={styles.heading}>Promotion now</Text>
              </View>
              <View style={styles.promotionalArtContainer}>
                <Text style={styles.heading}>Promotion now</Text>
              </View>
            </View>
          ) : (
            <View style={styles.promosContainer}>
              {data.map((curr_data, i) => (
                <TouchableOpacity
                  style={styles.promotionalArtContainer}
                  key={i}
                  onPress={() => {
                    setPopularsPressed(true);
                    setCurrentPopularRecipe(curr_data.recipes);
                    setRecipeGoal(curr_data.goal);
                    console.log(popularRecipesPressed);
                  }}
                >
                  <View style={styles.secondaryOpacity} />
                  {currImg(curr_data.goal)}
                  <Text style={styles.goalHeading}>{curr_data.goal}</Text>
                  <Text style={styles.goalDescription}>{curr_data.desc}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </ScrollView>
    //   </View>
    // </ScrollView>
  );
};
const styles = StyleSheet.create({
  background: {
    height: "100%",
    backgroundColor: theme.colors.background,
  },
  promosContainer: {
    width: "100%",
    // marginTop:10,
    gap: 12,
    height: 400,
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 20,
  },
  promotionalArtContainer: {
    width: 300,
    height: 200,
    borderRadius: 20,
    backgroundColor: theme.colors.imagePlaceholder,
    zIndex: 1,
    alignSelf: "center",
    padding: 40,
  },
  promotionalArt: {
    width: "80%",
    height: "60%",
    borderRadius: 20,
    zIndex: 2,
  },
  promotionLabel: {
    fontSize: 36,
    color: "white",
    textShadowColor: "black",
    textShadowRadius: 80,
    fontWeight: "bold",
    bottom: 10,
    right: 25,
    zIndex: 3,
  },
  heading: {
    fontSize: 24,
    fontWeight: "600",
    marginLeft: 10,
    marginTop: 20,
    color: theme.colors.text,
  },
  categories: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    overflow: "visible",
    marginBottom: 0,
    height: 220,
  },
  item: {
    width: 140,
    height: 150,
    borderRadius: 20,
    marginLeft: 25,
    backgroundColor: theme.colors.accent,
    overflow: "visible",
  },
  fridgeItemContainer: {
    width: 140,
    height: 120,
    borderRadius: 20,
    marginLeft: 25,
    backgroundColor: theme.colors.primary,
    overflow: "visible",
  },
  fridgeImage: {
    marginTop: 10,
    width: 140,
    height: 120,
  },
  itemLabel: {
    marginTop: 15,
    marginLeft: 15,
    fontWeight: "500",
    color: theme.colors.background,
    fontSize: 20,
  },
  itemScrollEnd: {
    width: 140,
    height: 150,
    borderRadius: 20,
    marginLeft: 25,
    marginRight: 30,
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
  },
  itemScrollEndCircle: {
    width: 80,
    height: 80,
    borderRadius: 80,
    backgroundColor: theme.colors.primary,
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 15,
  },
  itemScrollEndText: {
    fontWeight: "600",
    textAlign: "center",
    fontSize: 18,
  },
  itemImage: {
    width: "135%",
    height: "166%",
    position: "absolute",
    borderRadius: 20,
    opacity: 0.7,
  },
  goalHeading: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
    color: "beige",
    zIndex: 3,
  },
  goalDescription: {
    fontSize: 15,
    color: "white",
    marginLeft: 10,
    zIndex: 3,
    fontWeight: "600",
    letterSpacing: 1,
    textShadowColor: "black",
    shadowOpacity: 0.8,
  },
  secondaryOpacity: {
    backgroundColor: theme.colors.primary,
    width: "135%",
    height: "166%",
    position: "absolute",
    borderRadius: 20,
    opacity: 1,
  },
});
export default HomeScreen;
