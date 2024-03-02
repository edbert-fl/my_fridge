import React from 'react'
import { TouchableOpacity,Image } from 'react-native'
const FamousRecipeModal = (style1,imgUrl,style2) => {
    const ImageGenerate = () => imgUrl === "../../assets/placeholder1.jpg" ? <Image source={require("../../assets/placeholder1.jpg")} style={style2} /> :imgUrl === "../../assets/placeholder2.jpg" ? <Image source={require("../../assets/placeholder2.jpg")} style={style2} /> : imgUrl === "../../assets/placeholder3.jpg" ? <Image source={require("../../assets/placeholder3.jpg")} style={style2} /> : <Image source={require("../../assets/placeholder4.jpg")} style={style2} />
return (
    <TouchableOpacity style={style1}  >
        {ImageGenerate()}
    </TouchableOpacity> 
  )
}

export default FamousRecipeModal
