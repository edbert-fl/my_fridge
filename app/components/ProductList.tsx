import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Item } from "../utils/Types";
import ProductCard from "./ProductCard";

interface ProductListProps {
  items: Item[];
}

const ProductList: React.FC<ProductListProps> = ({ items }) => {
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

  return (
    <View>
      {items.map((item, index) => (
        <TouchableOpacity>
          <View>
            <ProductCard key={index} item={item} />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  ProductContainer: {},
});
