import * as React from "react";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import AppHeader from "../components/AppHeader";
import HistoryList from "../components/HistoryList";
import { theme } from "../utils/Styles";
import { Receipt } from "../utils/Types";

export const ReceiptHistory = () => {
  const ColesReceipt_1: Receipt = {
    userID: 1,
    receiptID: 1234,
    store: "Coles",
    dateOfPurchase: new Date(2024, 2, 25),
    healthRating: 4,
  };

  const ColesReceipt_2: Receipt = {
    userID: 2,
    receiptID: 3534,
    store: "Coles",
    dateOfPurchase: new Date(2024, 2, 28),
    healthRating: 3,
  };

  const ColesReceipt_3: Receipt = {
    userID: 3,
    receiptID: 3854,
    store: "Woolsworth",
    dateOfPurchase: new Date(2024, 2, 21),
    healthRating: 4,
  };

  const receipts = [ColesReceipt_1, ColesReceipt_2, ColesReceipt_3];

  const sortReceipt = (Receipts: Receipt[]) => {
    let x;
    let swap = true;
    while (swap == true) {
      for (let i = 0; i < Receipts.length - 1; i++) {
        if (Receipts[i].dateOfPurchase > Receipts[i + 1].dateOfPurchase) {
          x = Receipts[i];
          Receipts[i] = Receipts[i + 1];
          Receipts[i + 1] = x;
          swap = true;
          break;
        } else {
          swap = false;
        }
      }
    }
    return Receipts;
  };

  const [products, setProducts] = useState<Receipt[]>(sortReceipt(receipts));

  return (
    <View style={styles.background}>
      <AppHeader title={"My Receipts"} />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        style={{ backgroundColor: theme.colors.background }}
      >
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
