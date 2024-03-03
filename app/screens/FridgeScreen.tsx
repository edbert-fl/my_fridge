import { RouteProp } from "@react-navigation/core";
import * as React from "react";
import { useState } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import AppHeader from "../components/AppHeader";
import ProductList from "../components/ProductList";
import { theme } from "../utils/Styles";
import { Item, ScannerParamList } from "../utils/Types";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialIcons";
import { demoItems } from "../utils/Helpers";

export const FridgeScreen = () => {
  const scannerNavigation =
    useNavigation<StackNavigationProp<ScannerParamList>>()

  const sortItems = (items: Item[]) => {
    let x;
    let swap = true;
    while (swap == true) {
      for (let i = 0; i < items.length - 1; i++) {
        if (items[i].expiryDate > items[i + 1].expiryDate) {
          x = items[i];
          items[i] = items[i + 1];
          items[i + 1] = x;
          swap = true;
          break;
        } else {
          swap = false;
        }
      }
    }
    return items;
  };

  const [products, setProducts] = useState<Item[]>(sortItems(demoItems));

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
      <AppHeader
        title={"Fridge Items"}
        onBackIcon={
          <Icon name="arrow-back" size={24} color={theme.colors.background} />
        }
        onBackPress={() => scannerNavigation.goBack()}
      />
      <View style={{ paddingVertical: 10 }} />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        style={{ backgroundColor: theme.colors.background }}
      >
        <ProductList items={products} />
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

export default FridgeScreen;
