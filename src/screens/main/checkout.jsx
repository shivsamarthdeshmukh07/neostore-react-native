import React, { useEffect, useState } from "react";
import { Pressable, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { fontScale, heightScale, widthScale } from "../../assets/constants/metric";
import Icon3 from 'react-native-vector-icons/Ionicons';
import Cart from "./cart";
import Address from "./address";
import AddressCard from "./addressCard";
import axios from "axios";
import { useSelector } from "react-redux";
import address from "./address";
import { showMessage } from "react-native-flash-message";



const back = <Icon3 name={'chevron-back'} size={25} />;

export default Checkout = ({route,navigation})=>{
        console.log("checkout",route.params)
        const Address = {...route.params}
        const addressString=`${Address.houseNo} ${Address.street} ${Address.city} ${Address.state} ${Address.pincode}`
        console.log("address",addressString)


        const [data,setData]=useState('')
        const [subTotal,setSubTotal]=useState('')
        const [code,setCode]=useState('')
        const [total,setTotal]=useState()
      
         //setTotal(data?.total)
         
      
        const userData = useSelector(state => state.neoStore.userData)
      
      
          const getCartItems = async () => {
              await axios({
                method: 'GET',
                url: 'http://staging.php-dev.in:8844/trainingapp/api/cart',
                
                headers: {
                  'Content-Type': 'application/json',
                  access_token:userData.user_data.access_token
                },
              })
                .then(res =>{setData(res.data)
                  setTotal(res?.data?.total)
                  console.log('daaata',res.data)
                 
      
                  setSubTotal(res.data?.data[0]?.product?.sub_total)
                })
                .catch(e => console.log('get data error',data.data.access_token));
            }

            useEffect(() => {
              const unsubscribe = navigation.addListener('focus', () => {
                 getCartItems()
              });
              return unsubscribe;
            }, [navigation,subTotal]);
      
                useEffect(() => {
          
                 getCartItems()
              
              
            }, [subTotal]);
      
          const updateTotal = (priceChange) => {
            setSubTotal(prevTotal => prevTotal + priceChange);
          }







          const order = async (data) => {
            console.log('Token:', userData.user_data.access_token);
          
            const formData = new FormData();
            formData.append('address', data);
          
            try {
              const result = await axios.post(
                'http://staging.php-dev.in:8844/trainingapp/api/order',
                formData,
                {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                    access_token: userData.user_data.access_token,
                  },
                }
              
              )
                if(result){
                  showMessage({
            
                    message: "Order placed",
                    description: "Thanks for order Redirecting to Home Page",
                    type: "success",
                  });
                  setTimeout(()=>navigation.navigate("home"),2000)
                }
             
    
              
          
              console.log('Response Data:', result);
            } catch (error) {
              console.error('Error occurred:', error);
            }
          };
          

    return(
      <SafeAreaView >
       <View style={{flexDirection: 'row', justifyContent: 'space-between',marginHorizontal: widthScale(33),marginBottom:heightScale(5)}}>
          <Pressable onPress={() => navigation.goBack('deliveryAddress')}>
            {back}
          </Pressable>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Checkoput</Text>
          <Text>  </Text>
        </View>
         <View style={{marginHorizontal:widthScale(33)}}> 
        <Text style={{marginTop:heightScale(30),marginBottom:heightScale(15),fontSize:fontScale(18),fontWeight:"400"}}>Delivery Address</Text>
              
         </View>
         <AddressCard item={Address} border={true}/>
         <Text style={{marginHorizontal: widthScale(33),fontSize:fontScale(18),fontWeight:"400"}}>Cart Summery</Text>

         <ScrollView style={{marginHorizontal: widthScale(33),marginTop:heightScale(5),height:heightScale(300)}}
        showsVerticalScrollIndicator={false}
        >
            {data?.data?.map((item)=>{
              return(
                <CartItem key={item.product_id} item={item} updateTotal={updateTotal}/>
              )
            })}
        
        
        </ScrollView>


         <View style={{position:"absolute",top:heightScale(600),width:widthScale(375),paddingHorizontal:widthScale(33),backgroundColor:"white",height:500}}>
          <View style={{flexDirection:"row",justifyContent:"space-between"}}>
          <Text style={{marginTop:heightScale(15),marginBottom:heightScale(20),fontSize:fontScale(16),fontWeight:"bold"}}>Cart Total</Text>
          <Text style={{marginTop:heightScale(15),marginBottom:heightScale(25),fontSize:fontScale(16),fontWeight:"500"}}>{total}</Text>

          </View>
            <TouchableOpacity style={{height:heightScale(45),width:widthScale(320),backgroundColor:"black",borderRadius:15,justifyContent:"center",alignItems:"center"}}
      onPress={()=>order(addressString)}
      // disabled={setData}
      >
    <Text style={{fontSize:18,color:"white",fontWeight:"600"}}>order</Text>
      </TouchableOpacity>
      </View>
      </SafeAreaView>  
    )
}