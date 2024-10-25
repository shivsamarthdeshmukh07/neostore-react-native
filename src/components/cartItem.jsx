import React, { memo, useState }  from "react";
import { Image, Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native'
import { fontScale,widthScale, heightScale } from "../assets/constants/metric";
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from "react-redux";
import axios from "axios";



const cancelIcon = <Icon2 name={'highlight-remove'} size={25} color={"gray"}/>;

export default CartItem=memo(({item,updateTotal})=>{
    const userData = useSelector(state => state.neoStore.userData)

  const [quantity, setQuantity] = useState(item.quantity)
  console.log("qqq",quantity);
  

  const editCart = async (qty) => {
    const formData = new FormData();
    formData.append("product_id",item.product_id)
    formData.append("quantity",qty)
    console.log("formdata",quantity)
    await axios({
      method: 'POST',
      data: formData,
      url: `http://staging.php-dev.in:8844/trainingapp/api/editCart`,
      headers: {
        
         "Content-Type":"multipart/form-data",
        access_token:userData.user_data.access_token
      },
    })
      .then(res =>{ 
           console.log("cart edited" , res)
      })
      .catch(e => console.log('error--', e));
  }

  const deleteCart = async () => {
    const formData = new FormData();
    formData.append("product_id",item.product_id)
    await axios({
      method: 'POST',
      data: formData,
      url: `http://staging.php-dev.in:8844/trainingapp/api/deleteCart`,
      headers: {
        
         "Content-Type":"multipart/form-data",
        access_token:userData.user_data.access_token
      },
    })
      .then(res =>{ 
           console.log("cart deleted" , res)
      })
      .catch(e => console.log('error--', e));
  }

 
  const handleQuantityChange = (change=0) => {
    const newQuantity = quantity + change;
    const priceChange = item.product.cost * change;
    setQuantity(newQuantity);  
    editCart(newQuantity);     
    updateTotal(priceChange); 
  }

  const handleDeletechange=(change=-1)=>{
    const priceChange = item.product.cost * change;
    deleteCart()
    updateTotal(priceChange); 
  }


    return(
        <View style={{flexDirection:"row",width:widthScale(310),height:heightScale(99),marginTop:heightScale(30)}}>
               <Image style={{height:heightScale(97),width:widthScale(99),resizeMode:"stretch"}}
                 source={{uri:`${item?.product?.product_images}`}}
               />
               <View style={{paddingHorizontal:widthScale(10)}}>
               <View style={{flexDirection:"row",marginVertical:heightScale(15),width:widthScale(180),marginLeft:widthScale(10),justifyContent:"space-between"}}>
                <Text style={{fontSize:fontScale(14),width:widthScale(100),}}>{item?.product?.name}</Text>
                 <Pressable 
                 onPress={()=>{
                    handleDeletechange()
                 }}
                 >
                  {cancelIcon}
                  </Pressable>                
               </View>
               <View style={{flexDirection:"row",marginLeft:widthScale(10),justifyContent:"space-between"}}>
               <Text style={{fontSize:fontScale(16),fontWeight:"600"}}>${item?.product?.cost}</Text>

               <View style={{ flexDirection:'row',justifyContent:"space-around",height:heightScale(45),width:widthScale(100),borderRadius:15,}}>
    <Pressable style={{height:heightScale(25),width:widthScale(25),borderWidth:0.25,borderRadius:10,justifyContent:"center",alignItems:"center"}}
                 onPress={() => quantity > 1 && handleQuantityChange(-1)}  // Decrease quantity

    >
   
   
    <Text style={{marginTop:-2,fontSize:fontScale(15)}}>-</Text>
    

    </Pressable>
    <View style={{height:heightScale(25),width:widthScale(25),borderWidth:0.25,borderRadius:10,justifyContent:"center",alignItems:"center"}}>
    <Text>{quantity}</Text>
    </View>
    <Pressable style={{height:heightScale(25),width:widthScale(25),borderWidth:0.25,borderRadius:10,justifyContent:"center",alignItems:"center"}}
                     onPress={() => quantity < 8 && handleQuantityChange(1)}  // Increase quantity

    >
    <Text style={{marginTop:-2,fontSize:fontScale(15)}}>+</Text>
    </Pressable>


      </View>
               </View>
               </View>
              </View>
    )
})