import { RouteProp } from "@react-navigation/core";
import * as React from "react";
import { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import AppHeader from "../components/AppHeader";
import ProductList from "../components/ProductList";
import { theme } from "../utils/Styles";
import { Item, ScannerParamList } from "../utils/Types";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SERVER_URL, demoItems } from "../utils/Helpers";

interface ItemsInReceiptProps {
  route: ItemsInReceiptRouteProp;
}

type ItemsInReceiptRouteProp = RouteProp<ScannerParamList, "ItemsInReceipt">;

interface ItemsInReceiptProps {
  route: ItemsInReceiptRouteProp;
}

export const ItemsInReceipt: React.FC<ItemsInReceiptProps> = ({ route }) => {
  const { receiptID } = route.params;

  const scannerNavigation =
    useNavigation<StackNavigationProp<ScannerParamList>>();

  const [receiptItem, setReceiptItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(SERVER_URL + "/items/" + receiptID);
        const response = await fetch(SERVER_URL + "/items/" + receiptID);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setReceiptItem(data.items);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  console.log(receiptItem);

  // console.log(receiptItem);

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
  console.log(receiptItem);
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
        {/* TODO: CHANGE THIS TO PRODUCTS/FILTERED PRODUCTS */}
        {receiptItem !== null && <ProductList items={receiptItem} />}
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

export default ItemsInReceipt;
