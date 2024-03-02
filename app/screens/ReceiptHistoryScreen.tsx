import * as React from "react";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SearchBar } from "react-native-elements";
import AppHeader from "../components/AppHeader";
import ProductList from "../components/ProductList";
import { theme } from "../utils/Styles";
import { Receipt } from "../utils/Types";
import HistoryList from "../components/HistoryList";

// export interface Receipt {
//   userID: number,
//   receiptID: number,
//   store: string,
//   dateOfPurchase: Date,
//   totalSpent: number,
//   healthRating: number
// }

export const ReceiptHistory = () => {
  
  const ColesReceipt_1: Receipt = {
    userID: 1,
    receiptID: 1234,
    store: "Coles",
    dateOfPurchase: new Date(2024, 2, 25),
    totalSpent: 35,
    healthRating: 4,
  };

  const ColesReceipt_2: Receipt = {
    userID: 2,
    receiptID: 3534,
    store: "Coles",
    dateOfPurchase: new Date(2024, 2, 28),
    healthRating: 3,
  }

  const ColesReceipt_3: Receipt = {
    userID: 3,
    receiptID: 3854,
    store: "Woolsworth",
    dateOfPurchase: new Date(2024, 2, 21),
    totalSpent: 48.50,
    healthRating: 4,
  }

  const receipts = [ColesReceipt_1, ColesReceipt_2, ColesReceipt_3];

  const sortReceipt = (Receipts: Receipt[]) => {
    let x;
    let swap = true;
    while (swap == true) {
      for(let i = 0; i < Receipts.length - 1; i++) {
        if(Receipts[i].dateOfPurchase > Receipts[i + 1].dateOfPurchase) {
          x = Receipts[i];
          Receipts[i] = Receipts[i + 1];
          Receipts[i + 1] = x;
          swap = true;
          break;
        }
        else {
          swap = false;
        }
      }
    }
    return Receipts
  }

  const [products, setProducts] = useState<Receipt[]>(sortReceipt(receipts));
  const [filteredProducts, setFilteredProducts] = useState<Receipt[]>([]);
  const [search, setSearch] = useState("");


  return (
    <View style={styles.background}>
      <AppHeader title={"Fridge Items"} />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        style={{ backgroundColor: theme.colors.background }}
      >
        {/* TODO: CHANGE THIS TO PRODUCTS/FILTERED PRODUCTS */}
        <HistoryList Receipts={products} />
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

export default ReceiptHistory;
