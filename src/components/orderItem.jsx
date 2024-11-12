import React from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { fontScale, heightScale, widthScale } from "../assets/constants/metric";
import { useNavigation } from "@react-navigation/native";

export default OrderItem = ({orderId,orderDate,orderCost}) => {
  const navigation = useNavigation()
    return(
        <View style={{width:widthScale(309),borderRadius:20,height:heightScale(115),marginBottom:heightScale(25),borderWidth:0.3}}>

          <View style={{flexDirection:"row"}}>
          <Text style={{marginTop:heightScale(15),marginBottom:heightScale(5),fontSize:fontScale(16),fontWeight:"bold",paddingHorizontal:widthScale(10)}}>Order No.</Text>
          <Text style={{marginTop:heightScale(15),marginBottom:heightScale(5),fontSize:fontScale(16),fontWeight:"bold"}}>{orderId}</Text>
            
            </View>    
            <View style={{flexDirection:"row",justifyContent:"space-between"}}>

            <View style={{flexDirection:"row" }}>
          <Text style={{marginBottom:heightScale(10),fontSize:fontScale(16),fontWeight:"400",paddingLeft:widthScale(10)}}>Date. </Text>
          <Text style={{marginBottom:heightScale(10),fontSize:fontScale(16),fontWeight:"400"}}>{orderDate}</Text>
            </View>  
            <View style={{flexDirection:"row" }}>
          <Text style={{marginBottom:heightScale(10),fontSize:fontScale(16),fontWeight:"400",}}>total cost : </Text>
          <Text style={{marginBottom:heightScale(10),fontSize:fontScale(16),fontWeight:"400",paddingRight:widthScale(10)}}>{orderCost}</Text>
            </View>  
            </View>   
            <View style={{flexDirection:"row" ,justifyContent:"space-between",alignItems:"center"}}>
         
          <Text style={{fontSize:fontScale(16),fontWeight:"400",paddingHorizontal:widthScale(10)}}>Delivered</Text>
          <TouchableOpacity style={{height:Platform.OS==="ios"? heightScale(40):heightScale(35),width:widthScale(118),backgroundColor:"black",borderRadius:15,justifyContent:"center",alignItems:"center",marginRight:widthScale(10)}}
      onPress={()=>{
      
        navigation.navigate("orderDetail",{orderId,orderDate})
      }}
      >
    <Text style={{fontSize:18,color:"white",fontWeight:"600"}}>Details</Text>
      </TouchableOpacity>
            
            </View>      

        
        </View>
    )
}