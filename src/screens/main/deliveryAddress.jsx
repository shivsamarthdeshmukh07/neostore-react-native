import React, { useState } from "react";
import { Pressable, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { fontScale, heightScale, widthScale } from "../../assets/constants/metric";
import Icon3 from 'react-native-vector-icons/Ionicons';
import { useSelector } from "react-redux";
import AddressCard from "./addressCard";

const back = <Icon3 name={'chevron-back'} size={25} />;

export default DeliveryAddress = ({navigation})=>{
    const saveAddress= useSelector(state=>state.neoStore.address)
    const [selectedId, setSelectedId] = useState(null);
    console.log("iddddd",selectedId)
    const selectedAddress=saveAddress.find((item)=>item.id==selectedId)
    console.log("adddddddddddd",selectedAddress)

    return(
        <SafeAreaView>
             <View style={{flexDirection: 'row', justifyContent: 'space-between',marginHorizontal: widthScale(33),marginBottom:heightScale(50)}}>
          <Pressable onPress={() => navigation.goBack('home')}>
            {back}
          </Pressable>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Address</Text>
          <Text>  </Text>
        </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                
                {saveAddress ?saveAddress.map((item)=>{
                    return(
                        
                        <AddressCard item={item}
                        isSelected={item.id === selectedId}
                        onSelect={() => setSelectedId(item.id)}
                        />
                    )
                }):null}
            </ScrollView>
            <View style={{position:"absolute",marginTop:heightScale(710),height:heightScale(100),backgroundColor:"white"}}> 
            <TouchableOpacity style={{marginHorizontal:widthScale(33),height:heightScale(45),width:widthScale(320),backgroundColor:"black",borderRadius:15,justifyContent:"center",alignItems:"center",marginTop:heightScale(15)}}
      onPress={()=>{
            selectedId?navigation.navigate("checkout",selectedAddress):null
      }}
      >
    <Text style={{fontSize:18,color:"white",fontWeight:"600"}}>Proceed to Checkout</Text>
      </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}