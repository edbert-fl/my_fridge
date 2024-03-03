import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Item, ScannerParamList } from "../utils/Types";
import ProductCard from "./ProductCard";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

interface ProductListProps {
  items: Item[];
}

const ProductList: React.FC<ProductListProps> = ({ items }) => {

  const scannerNavigation =
  useNavigation<StackNavigationProp<ScannerParamList>>();

  const navigateToItemScreen = (itemID: number) => {
    scannerNavigation.navigate("ItemScreen", {
      itemID: itemID,
      justAdded: true
    });
  };

  return (
    <View>
      {items.map((item) => (
        <TouchableOpacity key={item.itemID} onPress={() => navigateToItemScreen(item.itemID)}>
          <View>
            <ProductCard item={item} />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ProductList;
