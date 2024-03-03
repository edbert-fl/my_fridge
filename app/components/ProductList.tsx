import React,{useState} from "react";
import { TouchableOpacity, View } from "react-native";
import { Item, ScannerParamList } from "../utils/Types";
import ProductCard from "./ProductCard";
import { useNavigation } from "@react-navigation/native";
import ItemScreen from "../screens/ItemScreen";
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
  const [itemPressed, setItemPressed] = useState<boolean>(false)
  const [currentItem, setCurrentItem] = useState([]);
  if (itemPressed) {
    return <ItemScreen item={currentItem} setItemPressed={setItemPressed} />
  }
  return (
    <View>
      {items.map((item) => (
        <TouchableOpacity key={item.itemid} onPress={() => 
          {
            setItemPressed(true)
            setCurrentItem(item)
        }}
        >
          <View>
            <ProductCard item={item} />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ProductList;
