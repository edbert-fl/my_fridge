import { RouteProp } from "@react-navigation/core";
import * as React from "react";
import { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import AppHeader from "../components/AppHeader";
import ProductList from "../components/ProductList";
import { theme } from "../utils/Styles";
import { Item, ScannerParamList } from "../utils/Types";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialIcons";
import { demoItems } from "../utils/Helpers";
import { useAppContext } from "../context/AppContext";
import axios from'axios'
export const FridgeScreen = () => {
  const [success, setSuccess] = useState(false)
  const scannerNavigation =
    useNavigation<StackNavigationProp<ScannerParamList>>()
  const {currUser} = useAppContext()
  const sortItems = (items: Item[]) => {
    let x;
    let swap = true;
    while (swap == true) {
      for (let i = 0; i < items.length - 1; i++) {
        if (items[i].expirydate > items[i + 1].expirydate) {
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

  const [products, setProducts] = useState(null);
  useEffect(()=>{
    console.log(currUser);
    
    try {
      console.log("CURRUSER", currUser)
      const fetchData = async () => {
        console.log("run")
        const resp = await axios.get(!currUser?.userID ?`http://10.248.200.127:3000/user/1/items/notexpired`:`http://10.248.200.127:3000/user/${currUser.userID}/items/notexpired` )
        const data = await resp.data
        if (data) {
          setProducts(data?.items)
          // console.log(data);
          // console.log(currUser);
          
        }
        // setProducts(data)

      }
      fetchData()
    } catch (error) {
      console.log("err");
      
    }
    
  },[])
  useEffect(()=>{
    // console.log(products);
    setSuccess(true)
  },[products])
  if (success) {
      // console.log(products);
      
      products?.map((prod) => {
        console.log(prod.name)
      })
    
    
  }
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
        {(success && products!== null)  && <ProductList items={products} />}
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
