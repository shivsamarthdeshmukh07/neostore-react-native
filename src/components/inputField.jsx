import React, { memo, useState } from "react";
import { Pressable, Settings, Text, TextInput, View } from "react-native";
import styles from "../assets/styles/styles";
import globalStyles from "../assets/styles/styles";
import EyeIcon from 'react-native-vector-icons/Feather';
import { heightScale, widthScale } from "../assets/constants/metric";



export default InputField = ({placeHolder,icon,getDataFromChild,}) =>{


    const [visible,setVisible]=useState(false)
    const [value , setValue] = useState("");
    const [isFocus,setFocus] = useState(false);

const eyeIcon = <EyeIcon name={visible?"eye":"eye-off"} size={25} color="gray"/>

   // console.log("hiiiiii ")
    return(
      
        <View style={{
            // backgroundColor:"red",
            marginBottom:heightScale(10),
            paddingTop:heightScale(18),
         
            width :widthScale(310),
            // height:heightScale(50),
            borderBottomWidth:1,
            borderColor:"#D6D6D6",      
        }}>
           
            {isFocus&&<Text>{placeHolder}</Text>}

            <View style={{
            flexDirection:"row",    
        }} >
           <TextInput
           value={value}
           style={[globalStyles.authTextInpunt,]}
           placeholder={isFocus?"":placeHolder}
           secureTextEntry={visible}
           placeholderTextColor={"#343536"}
           onFocus={()=>setFocus(true)}
           
           onBlur={()=>{
             getDataFromChild(value)
            setFocus(false)
              //console.log("K",value)
           }}
           onChangeText={(text)=>{setValue(text)
           // console.log(value)
          //getDataFromChild(value)
        }
        }
           />  
           <Pressable
           onPress={()=>setVisible(!visible)}>{icon && eyeIcon}</Pressable>
           
           </View>
        </View>
      
    )
}