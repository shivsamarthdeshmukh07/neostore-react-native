import react, { useEffect, useState } from 'react'
import { Image, Pressable, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { fontScale, heightScale, widthScale } from '../../assets/constants/metric'
import Icon3 from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/MaterialIcons';

import { useSelector } from 'react-redux';
import axios from 'axios';
import CartItem from '../../components/cartItem';

const back = <Icon3 name={'chevron-back'} size={25} />;
const wishlistIcon = <Icon name={'heart'} size={25} />;
const cancelIcon = <Icon2 name={'highlight-remove'} size={25} color={"gray"}/>;


export default Cart=({navigation})=>{
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
      console.log("fgdhfgxghch",total)
    console.log("arr",data)
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
           getCartItems()
        });
        return unsubscribe;
      }, [navigation,subTotal]);
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
    

return(
    <SafeAreaView >
        <View style={{flexDirection: 'row', justifyContent: 'space-between',marginHorizontal: widthScale(33),marginBottom:heightScale(5)}}>
          <Pressable onPress={() => navigation.goBack('home')}>
            {back}
          </Pressable>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Your Cart</Text>
          {wishlistIcon}
        </View>

        <ScrollView style={{marginHorizontal: widthScale(33),marginTop:heightScale(30)}}
        showsVerticalScrollIndicator={false}
        >
            {data?.data?.map((item)=>{
              return(
                <CartItem key={item.product_id} item={item} updateTotal={updateTotal}/>
              )
            })}
            {/* <Text style={{color:'red',fontWeight:'bold'}}>{subTotal}</Text> */}
         <Text style={{marginTop:heightScale(15),marginBottom:heightScale(5),fontSize:fontScale(16),fontWeight:"500"}}>Coupon Code</Text>
         <View style={{flexDirection:"row"}}>
         <TextInput 
style={{marginLeft:widthScale(5),marginRight:widthScale(5),height:heightScale(40),width:widthScale(180)}}
   placeholder='Have a code ? type it here'
   onChangeText={(text)=>{
    setCode(text)
   
   }}
   />
    <TouchableOpacity style={{height:heightScale(40),width:widthScale(118),backgroundColor:"black",borderRadius:15,justifyContent:"center",alignItems:"center"}}
      onPress={()=>{
      
        
      }}
      >
    <Text style={{fontSize:18,color:"white",fontWeight:"600"}}>Apply</Text>
      </TouchableOpacity>
         </View>
        </ScrollView>

        <View style={{position:"absolute",top:heightScale(600),width:widthScale(375),paddingHorizontal:widthScale(33),backgroundColor:"white",height:500}}>
          <View style={{flexDirection:"row",justifyContent:"space-between"}}>
          <Text style={{marginTop:heightScale(15),marginBottom:heightScale(20),fontSize:fontScale(16),fontWeight:"bold"}}>Cart Total</Text>
          <Text style={{marginTop:heightScale(15),marginBottom:heightScale(25),fontSize:fontScale(16),fontWeight:"500"}}>{total}</Text>

          </View>
            <TouchableOpacity style={{height:heightScale(45),width:widthScale(320),backgroundColor:"black",borderRadius:15,justifyContent:"center",alignItems:"center"}}
      onPress={()=>{}}
      >
    <Text style={{fontSize:18,color:"white",fontWeight:"600"}}>Proceed to Checkout</Text>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
)

}