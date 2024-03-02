import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView } from 'react-native'
import React,{useState, useEffect} from 'react'
import { rotdList } from '../utils/defaultGoals';
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { data } from '../utils/defaultGoals';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { theme } from '../utils/Styles';
import { Item, Promo } from '../utils/Types';
import { BackgroundImage } from 'react-native-elements/dist/config';
import FamousRecipeModal from '../components/famousRecipeModal';
import DefaultRecipes from './DefaultRecipes';
import SpecificRecipe from './SpecificRecipe';
const Stack = createNativeStackNavigator();
const HomeScreen = () => {
  const [fridgeItems, setFridgeItems] = useState<Item[]>([]);
  const [popularRecipesPressed, setPopularsPressed] = useState<boolean>(false);
  const [currentPopularRecipe, setCurrentPopularRecipe] = useState([]);
  const [recipeGoal, setRecipeGoal] = useState<string>("");
  const [rotd, setRotd] = useState([])
  const [viewRotd, setViewRotd] = useState(false)
  // make new feature to scan nutrition value as well.
  useEffect(()=>{
    const index = Math.floor(Math.random()* rotdList.length);
    setRotd(rotdList[index])
    console.log(rotdList[index]);
    
  },[])
  const currImg = (goal:string) => (
    goal === "Lose Weight" ?
     <Image source={require("../../assets/loseweight_bg.jpg")} style={styles.categoryImage} /> 
     : goal === "Gain Muscle/Bulking" 
     ? <Image source={require("../../assets/bulking_bg.jpg")} style={styles.categoryImage} /> 
     : <Image source={require("../../assets/diseaseprevention_bg.jpg")} style={styles.categoryImage} />
  )
    if (popularRecipesPressed) {
        return (
        <DefaultRecipes currentPopularRecipe={currentPopularRecipe} setPopularsPressed={setPopularsPressed} recipeGoal={recipeGoal} />
       )
    }
    if (viewRotd) {
      return (
        <SpecificRecipe mealDetail={rotd} setSpecifyRecipe={setViewRotd} />
      )
    }
  return (
    <ScrollView style={{marginTop:40}}>
    <SafeAreaView style={styles.background}>
        
          <TouchableOpacity style={[styles.promotionalArtContainer, {width:330, marginRight:5}]} onPress={()=>setViewRotd(true)} >
          <View style={styles.blackBg} />
          <Image source={require("../../assets/rotd_placeholder.jpg")} style={[styles.categoryImage, {opacity:0.9}]} />
            <Text style={[styles.goalHeading,{color:"beige", fontSize:40, padding:3, alignSelf:"center", justifyContent:"center", zIndex:3}]}>
              RECIPE OF
            </Text>
            <Text style={[styles.goalHeading,{color:"white", fontSize:40, padding:3, alignSelf:"center", justifyContent:"center", zIndex:3}]}>
              THE DAY
            </Text>
          </TouchableOpacity>
        <Text style={styles.heading}>Your Fridge</Text>
        <View style={styles.categories} >
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
            {fridgeItems.length === 0 ? (
              <View style={{flexDirection:"row"}} >
                
                  
                        
                      <TouchableOpacity style={styles.categoryPlaceholder}  >
                        <Image source={require("../../assets/placeholder1.jpg")} style={styles.fridgePlaceholderImg} />
                      </TouchableOpacity>
                    
                      <TouchableOpacity style={styles.categoryPlaceholder}  >
                        <Image source={require("../../assets/placeholder2.jpg")} style={styles.fridgePlaceholderImg} />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.categoryPlaceholder} >
                        <Image source={require("../../assets/placeholder3.jpg")} style={styles.fridgePlaceholderImg} />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.categoryPlaceholder} >
                        <Image source={require("../../assets/placeholder4.jpg")} style={styles.fridgePlaceholderImg} />
                      </TouchableOpacity>
                
                
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
        <Text style={[styles.heading,{bottom:40}]}>Popular recipes right now</Text>
        <View style={{display:"flex", bottom:100,height:300}} >
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                {data.length === 0 ? (
                  <View style={styles.promosContainer} >
                    <View style={styles.promotionalArtContainer} >
                      <Image source={require("../../assets/bulking_bg.jpg")} style={styles.categoryImage} />
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
                  <View style={styles.promosContainer}>
                  {data.map((curr_data, i)=> (
                    <TouchableOpacity style={styles.promotionalArtContainer} key={i} 
                      onPress={()=> {
                          setPopularsPressed(true);
                          setCurrentPopularRecipe(curr_data.recipes)
                          setRecipeGoal(curr_data.goal)
                          console.log(popularRecipesPressed)
                      }}
                    >
                        <View style={styles.blackBg} />
                        {currImg(curr_data.goal)}
                        <Text style={styles.goalHeading} >{curr_data.goal}</Text>
                        <Text style={styles.goalDescription} >{curr_data.desc}</Text>
                    </TouchableOpacity>
                  ) )}
                  </View>
                  
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
    width: "135%",
    height: "166%",
    position:"absolute",
    borderRadius:20,
    opacity:0.7
  },
  categoryLabel: {
    marginTop: 10,
    marginLeft: 10,
    fontWeight: "bold",
    color: theme.colors.buttonText,
    fontSize: 20,
  },
  goalHeading:{
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
    color: "beige",
    zIndex:3
  },
  goalDescription:{
    fontSize: 15,
    color:"white",
    marginLeft: 10,
    zIndex:3,
    fontWeight:"600",
    letterSpacing:1,
    textShadowColor:"black",
    shadowOpacity:0.8,
    // textAlign:"justify"
  },
  blackBg:{
    backgroundColor:"black",
    width: "135%",
    height: "166%",
    position:"absolute",
    borderRadius:20,
    opacity:0.4
  },
  fridgePlaceholderImg:{
    width: 140,
    height: 150,
    borderRadius: 20,
    position:"absolute"
  }
});
export default HomeScreen