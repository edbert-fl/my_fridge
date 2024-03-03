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
  // const [products, setProducts] = useState<Item[]>([]);

  // const [filteredProducts, setFilteredProducts] = useState<Item[]>([]);
  const [currProduct, setCurrProduct] = useState<Item>();

  // TODO: DELETE AFTER
  // const burger: Item = {
  //   itemID: 1,
  //   receiptID: 1,
  //   name: "Hamburger",
  //   quantity: 4,
  //   weight: null,
  //   expiryDate: new Date(),
  //   price: 5.2,
  //   healthRating: 3,
  //   healthComment: "Burgers are not good for you. Eat in moderation.",
  // };

  // const noodle: Item = {
  //   itemID: 2,
  //   receiptID: 2,
  //   name: "Noodle",
  //   quantity: 2,
  //   weight: null,
  //   expiryDate: new Date(),
  //   price: 3,
  //   healthRating: 4,
  //   healthComment: "Noodles are good for you.",
  // };

  // const chicken: Item = {
  //   itemID: 3,
  //   receiptID: 3,
  //   name: "Chicken",
  //   quantity: 5,
  //   weight: null,
  //   expiryDate: new Date(2024, 2, 23),
  //   price: 3,
  //   healthRating: 4,
  //   healthComment: "Noodles are good for you.",
  // };

  // const listOfItems: Item[] = [noodle, burger, chicken];
  const fetchProduct = async (itemID: Number) => {
    try {
      const response = await axios.get(`http://${DATABASE_URL}/items/${itemID}`);
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

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const productsCollection = collection(FIRESTORE_DB, "products");
  //       const productsSnapshot = await getDocs(productsCollection);
  //       const fetchedProducts: Product[] = productsSnapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         name: doc.data().name,
  //         description: doc.data().description,
  //         price: doc.data().price,
  //         image: doc.data().image,
  //         discountPrice: doc.data().discountPrice,
  //       }));

  //       setProducts(fetchedProducts);
  //       setFilteredProducts(fetchedProducts);
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     }
  //   };

  //   fetchProducts();
  // }, []);

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
