import React from "react";
import { Pressable, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import Icon4 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/FontAwesome';

import Icon2 from 'react-native-vector-icons/MaterialIcons';

import { fontScale, heightScale, widthScale } from "../../assets/constants/metric";
import CheckBox from "@react-native-community/checkbox";
import { useDispatch } from "react-redux";
import { deleteAddress } from "../../redux/neoSlice";
import { useNavigation } from "@react-navigation/native";



const otherIcon = <Icon4 name={'map-marker-radius-outline'} size={35}  />;
const homeIcon = <Icon name={'home-outline'} size={35} />;
const editIcon = <Icon3 name={'edit'} size={25} color={"gray"}/>;

const officeIcon = <Icon4 name={'office-building-outline'} size={35} />;
const cancelIcon = <Icon2 name={'highlight-remove'} size={25} color={"gray"}/>;


export default AddressCard = ({item,isSelected, onSelect}) => {
    const navigation = useNavigation();
    const dispatch = useDispatch()
console.log(item)    
console.log(isSelected)  

    return(
        <View style={{width:widthScale(315),marginHorizontal:widthScale(33),borderRadius:20,height:heightScale(95),marginBottom:heightScale(25)}}>
        <View style={{flexDirection:"row",alignItems:"center",height:heightScale(50),width:widthScale(315)}}>
             <CheckBox
           style={{height:20,width:20, marginLeft:widthScale(20),marginRight:widthScale(10)}}
           onCheckColor={"black"}
           value={isSelected}
           onValueChange={onSelect}
            onTintColor={"black"}
            />
           {item?.type === "Home"?homeIcon:item?.type == "Office"?officeIcon:otherIcon}

           <View style={{height:heightScale(30),width:widthScale(150),justifyContent:"center"}}>
            <Text style={{fontSize:fontScale(16), color:"gray"}}> Sent To</Text>
            <Text style={{fontSize:fontScale(16)}}> {item?.type}</Text>
            

           </View>
           <View style={{height:heightScale(30),width:widthScale(60),justifyContent:"center",alignItems:"flex-end"}}>
            {/* <Text style={{fontSize:fontScale(16)}}> edit</Text> */}
            <Pressable 
            onPress={()=>dispatch(deleteAddress(item?.id))}
            >
            {cancelIcon}
            </Pressable>
            

           </View>
           
        </View  >
        <View style={{flexDirection:"row",alignItems:"center"}}>
        <Text numberOfLines={2} style={{fontWeight:"300",width:widthScale(220),marginHorizontal:widthScale(20),marginRight:widthScale(30)}} >{item.houseNO} {item.street} {item.city} {item.state} {item.pincode}</Text>
            <Pressable
             onPress={()=>navigation.navigate("address",item)}
           >
           {editIcon}
           </Pressable>
        </View>
        </View>
    )
}