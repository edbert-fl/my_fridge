import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView } from 'react-native'
import React,{useState, useEffect} from 'react'
import { MainHeader } from '../components/MainHeader'
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { SearchBar } from "react-native-elements";
// import SearchScreen from "./SearchScreen";
import { theme } from '../utils/Styles';
import { Item, Promo } from '../utils/Types';
const HomeScreen = () => {
  const [search, setSearch] = useState("");
  const [fridgeItems, setFridgeItems] = useState<Item[]>([]);
  const [currentPromos, setCurrentPromos] = useState<Promo[]>([])
  // make new feature to scan nutrition value as well.
  return (
    <ScrollView>
    <SafeAreaView style={styles.background}>
        {/* <MainHeader title="MyFridge" > */}
          <View style={styles.promotionalArtContainer}>
            {/* <Text>My Fridge</Text> */}
          </View>
        {/* </MainHeader> */}
        {/* <SearchBar 
          platform="ios"
          value={search}
          inputContainerStyle={{backgroundColor:theme.colors.primary}}
          inputStyle={{backgroundColor:theme.colors.primary}}
          onBlur={()=>console.log("blur")}
          onClear={()=>console.log("clear")}
          onChangeText={()=> console.log("change")}
          onPressIn={()=>console.log("pressed")}
        /> */}
        <Text style={styles.heading}>Your Fridge</Text>
        <View style={styles.categories} >
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
            {fridgeItems.length === 0 ? (
              <View style={{flexDirection:"row"}} >
                <View style={styles.categoryPlaceholder} />
                <View style={styles.categoryPlaceholder} />
                <View style={styles.categoryPlaceholder} />
                <View style={styles.categoryPlaceholder} />

              </View>
            ) : (
              fridgeItems.map((item) => {
                return (
                  <TouchableOpacity key={item.itemID} >
                    <View key={item.itemID} style={styles.category} >
                      <Text style={styles.categoryLabel} >{item.name}</Text>
                      <Image style={styles.categoryImage} />
                    </View>
                  </TouchableOpacity>
                )
              })
            )}
            <View style={styles.categoryScrollEnd} >
              <TouchableOpacity>
                <View style={styles.categoryScrollEndCircle} >
                  <Icon
                    style={{ alignSelf: "center" }}
                    name="arrow-forward"
                    size={50}
                    color="#FFFFFF"
                  />
                </View>
                <Text style={styles.categoryScrollEndText}>All Items</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
        <Text style={styles.heading}>Promotions right now</Text>
        <View style={{display:"flex", bottom:50}} >
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                {currentPromos.length === 0 ? (
                  <View style={styles.promosContainer} >
                    <View style={styles.promotionalArtContainer} >
                      <Text style={styles.heading} >Promotion now</Text>
                    </View>
                    <View style={styles.promotionalArtContainer} >
                      <Text style={styles.heading} >Promotion now</Text>
                    </View>
                    <View style={styles.promotionalArtContainer} >
                      <Text style={styles.heading} >Promotion now</Text>
                    </View>
                  </View>
                ):(
                  currentPromos.map(() => (
                    <View>


                    </View>
                  ))
                )}
              </ScrollView>
        </View>
    </SafeAreaView>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  background: {
    height: "100%",
    // backgroundColor:"orange"
    backgroundColor: theme.colors.background
  },
  promosContainer:{
    width:"100%",
    // marginTop:10,
    gap:12,
    height: 400,
    alignItems:"center",
    flexDirection:"row",
    marginLeft:20
  },
  promotionalArtContainer: {
    width: 300,
    height: 200,
    borderRadius: 20,
    // marginTop: 10,
    backgroundColor: theme.colors.imagePlaceholder,
    zIndex: 1,
    alignSelf:"center",
    padding:40
  },
  promotionalArt: {
    width: "80%",
    height: "60%",
    borderRadius: 20,
    zIndex: 2,

  },
  promotionLabel: {
    fontSize: 36,
    color: 'white',
    textShadowColor: 'black',
    textShadowRadius: 80,
    fontWeight: 'bold',
    // position: 'absolute',
    bottom: 10,
    right: 25,
    zIndex: 3
  },
  heading: {
    fontSize: 24,
    fontWeight: "600",
    marginLeft: 10,
    marginTop: 20,
    color: theme.colors.text,
  },
  categories: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    overflow: "visible",
    height: 220,
  },
  category: {
    width: 140,
    height: 150,
    borderRadius: 20,
    marginLeft: 25,
    backgroundColor: theme.colors.accent,
    top: 0,
    overflow: "visible",
  },
  categoryPlaceholder: {
    width: 140,
    height: 150,
    borderRadius: 20,
    marginLeft: 25,
    backgroundColor: theme.colors.imagePlaceholder,
    top: 0,
  },
  categoryScrollEnd: {
    width: 140,
    height: 150,
    borderRadius: 20,
    marginLeft: 25,
    marginRight: 30,
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
  },
  categoryScrollEndCircle: {
    width: 80,
    height: 80,
    borderRadius: 80,
    backgroundColor: theme.colors.primary,
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 15,
  },
  categoryScrollEndText: {
    fontWeight: "600",
    textAlign: "center",
    fontSize: 18,
  },
  categoryImage: {
    width: 190,
    height: "100%",
  },
  categoryLabel: {
    marginTop: 10,
    marginLeft: 10,
    fontWeight: "bold",
    color: theme.colors.buttonText,
    fontSize: 20,
  },
});
export default HomeScreen