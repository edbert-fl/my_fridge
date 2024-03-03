import React,{useState} from 'react'
import { View, Text, StyleSheet,Image, TouchableOpacity } from 'react-native'
import { theme } from '../utils/Styles';
import { AntDesign } from '@expo/vector-icons';
import SpecificRecipe from './SpecificRecipe';
import { Recipe } from '../utils/Types';
interface DefaultRecipesProps {
    currentPopularRecipe: Recipe[];
    setPopularsPressed: React.Dispatch<React.SetStateAction<boolean>>;
    recipeGoal: string;
  }
  
const DefaultRecipes: React.FC<DefaultRecipesProps> = ({currentPopularRecipe, setPopularsPressed, recipeGoal}) => {
    const [specifyRecipe, setSpecifyRecipe] = useState(false)
    const [mealDetail, setMealDetail] = useState<Recipe[] | null>(null)
    
    if (specifyRecipe) {
        return <SpecificRecipe mealDetail={mealDetail} setSpecifyRecipe={setSpecifyRecipe} />
    }
    return (
        <View style={styles.container} >
            <Text style={styles.heading} >
                {`Category - ${recipeGoal}`}
            </Text>
            <View style={styles.recipesContainer} >
                {currentPopularRecipe.length === 0 ? (
                    <TouchableOpacity style={styles.recipesCard} >
                        <Text>fsfs</Text>
                    </TouchableOpacity>
                ) : 
                currentPopularRecipe.map((recipe)=>{
                    return (
                        <TouchableOpacity style={styles.recipesCard} key={recipe.img} 
                            onPress={() => {
                                setSpecifyRecipe(true)
                                setMealDetail(recipe)
                            }} 
                        >
                            <Image style={styles.recipeImage} source={{uri: recipe.img}} />
                        </TouchableOpacity> 
                    )
                    
                })
                }
               <TouchableOpacity style={[styles.editButton, { backgroundColor:theme.colors.warning, flexDirection:"row", gap:10, justifyContent:"center"}]} onPress={() => setPopularsPressed(false) } >
                    <AntDesign name="logout" size={24} color="white"  />  
                    <Text style={styles.editButtonText}>
                        Home
                    </Text>
                </TouchableOpacity>
            </View>
            
            
        </View>
  )
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: "#f9f9f9",
    },
    heading: {
        color:"green",
        fontWeight: "700",
        fontSize: 25,
        alignSelf:"flex-start",
        marginLeft:10,
        marginTop:60,
        padding:20
    },
    recipesContainer:{
        width: "100%",
        height: "100%",
        display:"flex",
        flexDirection: "row",
        flexWrap:"wrap",
        gap:15,
        marginTop: 40,
        justifyContent:"center"
    },
    recipesCard: {
        width: 180,
        height: 180,
        borderRadius: 20,
        backgroundColor:"red",
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 2,
    },
    recipeImage: {
        width: 180,
        height: 180,
        borderRadius: 20,
    },
    editButton: {
        backgroundColor: '#8bd78b',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: "90%",
        
        // height:200,
        // width:200
      },
      editButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
      },
})
export default DefaultRecipes
