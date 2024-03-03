import * as React from "react";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SearchBar } from "react-native-elements";
import AppHeader from "../components/AppHeader";
import ProductList from "../components/ProductList";
import { theme } from "../utils/Styles";
import { Item } from "../utils/Types";
import Icon from "react-native-vector-icons/MaterialIcons";
import { demoItems } from "../utils/Helpers";
import axios from "axios";
import { DATABASE_URL } from "../utils/Helpers";

export const ItemScreen = () => {
  const [currProduct, setCurrProduct] = useState<Item>();
  const fetchProduct = async (itemID: Number) => {
    try {
      const response = await axios.get(`http://${DATABASE_URL}/item/${itemID}`);
      const data = response.data;
      const fetchedProduct: Item = {
        itemID: data.itemID,
        receiptID: data.receiptID,
        name: data.name,
        quantity: data.number,
        expiryDate: data.expiryDate,
        weight: data.weight,
        price: data.price,
        healthRating: data.healthRating,
        healthComment: data.healthComment, 
        art: data.art,
      };
      console.log("Response: ", response);
      setCurrProduct(fetchedProduct);
    } catch (error) {
      console.log(`Error fetching item: ${error}`);
    }
  };

  return (
    <View style={styles.background}>
      <AppHeader title={"My Fridge"} />
      <View style={{ paddingTop: 30 }}/>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        style={{ backgroundColor: theme.colors.background }}
      >
        {/* TODO: CHANGE THIS TO PRODUCTS/FILTERED PRODUCTS */}
        <ProductList items={demoItems} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: theme.colors.background,
    height: "100%",
    width: "100%",
  },
});

export default ItemScreen;
