import { RouteProp } from "@react-navigation/core";
import * as React from "react";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import AppHeader from "../components/AppHeader";
import ProductList from "../components/ProductList";
import { theme } from "../utils/Styles";
import { Item, ScannerParamList } from "../utils/Types";

type ItemsInReceiptRouteProp = RouteProp<ScannerParamList, "ItemsInReceipt">

interface ItemsInReceiptProps {
  route: ItemsInReceiptRouteProp
}

export const ItemsInReceipt: React.FC<ItemsInReceiptProps> = ({ route }) => {
  const { receiptID } = route.params;
  
  // TODO: DELETE AFTER
  const burger: Item = {
    itemID: 1,
    receiptID: 1,
    name: "Hamburger",
    quantity: 4,
    weight: null,
    expiryDate: new Date(),
    price: 5.2,
    healthRating: 3,
    healthComment: "Burgers are not good for you. Eat in moderation.",
  };

  const noodle: Item = {
    itemID: 2,
    receiptID: 2,
    name: "Noodle",
    quantity: 2,
    weight: null,
    expiryDate: new Date(),
    price: 3,
    healthRating: 4,
    healthComment: "Noodles are good for you.",
  };

  const chicken: Item = {
    itemID: 3,
    receiptID: 3,
    name: "Chicken",
    quantity: 5,
    weight: null,
    expiryDate: new Date(2024, 2, 23),
    price: 3,
    healthRating: 4,
    healthComment: "Noodles are good for you.",
  };

  const sortItems = (items: Item[]) => {
    let x;
    let swap = true;
    while (swap == true) {
      for(let i = 0; i < items.length - 1; i++) {
        if(items[i].expiryDate > items[i + 1].expiryDate) {
          x = items[i];
          items[i] = items[i + 1];
          items[i + 1] = x;
          swap = true;
          break;
        }
        else {
          swap = false;
        }
      }
    }
    return items
  }

  const listOfItems: Item[] = [noodle, burger, chicken];
  const [products, setProducts] = useState<Item[]>(sortItems(listOfItems));

  const [filteredProducts, setFilteredProducts] = useState<Item[]>([]);
  const [search, setSearch] = useState("");


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

  const updateSearch = (items: Item[], text: string) => {
    if (text.valueOf() === "") {
      setProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
      setProducts(filtered);
    }

    setSearch(text);
  };

  

  return (
    <View style={styles.background}>
      <AppHeader title={"Fridge Items"} />
      <View style={{ padding: 5 }}>
        {/* <SearchBar
          placeholder="Search for items"
          onChangeText={updateSearch}
          leftIcon={<Icon name="search"/>}
          value={search}
          platform="ios"
          inputStyle={{ backgroundColor: theme.colors.surface }}
          inputContainerStyle={{ backgroundColor: theme.colors.surface }}
        /> */}
      </View>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        style={{ backgroundColor: theme.colors.background }}
      >
        {/* TODO: CHANGE THIS TO PRODUCTS/FILTERED PRODUCTS */}
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

export default ItemsInReceipt;
