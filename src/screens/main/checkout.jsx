import React from "react";
import { Pressable, SafeAreaView, Text, View } from "react-native";
import { heightScale, widthScale } from "../../assets/constants/metric";
import Icon3 from 'react-native-vector-icons/Ionicons';
import Cart from "./cart";



const back = <Icon3 name={'chevron-back'} size={25} />;

export default Checkout = ({route})=>{
        console.log("checkout",route.params)
    return(
      <SafeAreaView>
       <View style={{flexDirection: 'row', justifyContent: 'space-between',marginHorizontal: widthScale(33),marginBottom:heightScale(5)}}>
          <Pressable onPress={() => navigation.goBack('home')}>
            {back}
          </Pressable>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Payment</Text>
          <Text>  </Text>
        </View>
          
      </SafeAreaView>  
    )
}