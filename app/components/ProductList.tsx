import React, { useRef, useEffect } from "react";
import { StyleSheet, View } from "react-native";
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

  const noodle: Item = {
    itemID: 2,
    receiptID: 2,
    name: "noodle",
    quantity: 2,
    weight: null,
    expiryDate: new Date(),
    price: 3,
    healthRating: 4,
    healthComment: "Noodles are good for you.",
  };

  return (
    <View>
      {items.map((item, index) => (
        <View>
          <ProductCard key={index} item={item} />
        </View>
      ))}
    </View>
  );
};

export default ProductList;
