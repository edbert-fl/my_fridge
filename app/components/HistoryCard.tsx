import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Receipt } from "../utils/Types";

interface ProductCardProps {
  receipt: Receipt;
}

const HistoryCard: React.FC<ProductCardProps> = ({ receipt }) => {
  const leafRatingOptions = [1, 2, 3, 4, 5];
  const [leafRating, setleafRating] = useState(receipt.healthRating);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.rightContainer}>
          <View>
            <Text style={styles.storeName}>{receipt.store}</Text>
          </View>
          <View>
            <Text style={styles.dateOfPurchase}>
              {receipt.dateOfPurchase.toLocaleDateString()}
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
    height: 115,
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
    backgroundColor: "red",
    borderRadius: 3,
  },

  rightContainer: {
    flex: 5,
    display: "flex",
    flexDirection: "column",
    paddingLeft: 15,
    paddingTop: 11,
    paddingBottom: 11,
  },

  storeName: {
    marginBottom: 3,
    fontWeight: "bold",
    // textDecorationLine: "underline",
    fontSize: 18,
  },

  dateOfPurchase: {
    marginBottom: 5,
    fontWeight: "bold",
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

export default HistoryCard;
