import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Receipt } from "../utils/Types";
import HistoryCard from "./HistoryCard";

interface HistoryListProps {
  Receipts: Receipt[];
}

const HistoryList: React.FC<HistoryListProps> = ({ Receipts }) => {
  return (
    <View style={styles.ProductContainer}>
      {Receipts.map((receipt) => (
        <TouchableOpacity key={receipt.receiptID}>
          <View>
            <HistoryCard receipt={receipt} />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default HistoryList;

const styles = StyleSheet.create({
  ProductContainer: {
    marginTop: 20,
  },
});
