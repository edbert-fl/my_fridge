import React from "react";
import { Platform, StyleSheet, Text, View, Image } from "react-native";
import { Item } from "../utils/Types";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";

interface ProductCardProps {
  item: Item;
}

const formatDate = (expiryDate: any) => {
  const date = new Date(expiryDate);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}/${month}/${day}`;
};

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const leafRatingOptions = [1, 2, 3, 4, 5];
  const [leafRating, setleafRating] = useState(item.healthRating);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={
              item.art
                ? { uri: item.art }
                : require("../../assets/burger_placeholder.png")
            }
            style={styles.image}
          />
        </View>
        <View style={styles.rightContainer}>
          <View>
            <Text style={styles.itemName}>{item.name}</Text>
          </View>
          <View>
            <Text style={styles.expiryDate}>
              Expires {formatDate(item.expiryDate)}
            </Text>
          </View>
          <View>
            <Text>Health Rating </Text>
            <View style={styles.leafs}>
              {leafRatingOptions.map((option) => (
                <MaterialIcons
                  name={leafRating >= option ? "eco" : "eco"}
                  size={25}
                  style={
                    leafRating >= option
                      ? styles.leafSelected
                      : styles.leafUnselected
                  }
                />
              ))}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: 120,
    display: "flex",
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    ...(Platform.OS === "ios"
      ? {
          shadowColor: "black",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 2,
        }
      : {
          elevation: 2,
        }),
    flexDirection: "row",
    width: "90%",
    height: "100%",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#c8c8c8",
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
  },

  imageContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    height: 60,
    width: 60,
  },

  rightContainer: {
    flex: 5,
    display: "flex",
    flexDirection: "column",
    paddingLeft: 15,
    paddingTop: 11,
    paddingBottom: 11,
  },
  itemName: {
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 17,
  },

  expiryDate: {
    marginBottom: 5,
  },

  leafs: {
    display: "flex",
    flexDirection: "row",
    marginTop: 3,
  },
  leafUnselected: {
    color: "#aaa",
  },
  leafSelected: {
    color: "#008000",
  },
  // Animation
});

export default ProductCard;
