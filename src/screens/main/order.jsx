import react, { useEffect, useState } from 'react'
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native'
import OrderItem from '../../components/orderItem'
import Icon3 from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Feather';
import { heightScale, widthScale } from '../../assets/constants/metric';
import axios from 'axios';
import { useSelector } from 'react-redux';


const back = <Icon3 name={'chevron-back'} size={25} />;
const wishlistIcon = <Icon name={'heart'} size={25} />;
export default Order=({navigation})=>{

  const [data,setData]=useState([])

  const userData = useSelector(state => state.neoStore.userData)


    const getCartItems = async () => {
        await axios({
          method: 'GET',
          url: 'http://staging.php-dev.in:8844/trainingapp/api/orderList',
          
          headers: {
            'Content-Type': 'application/json',
            access_token:userData.user_data.access_token
          },
        })
          .then(res =>{setData(res.data.data)
           
          })
          .catch(e => console.log('get data error',data.data.access_token));
      }
     
    console.log("arr",data)

      useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
           getCartItems()
        });
        return unsubscribe;
      }, [navigation]);

     return(
    <SafeAreaView>
        <View style={{flexDirection: 'row', justifyContent: 'space-between',marginHorizontal: widthScale(33),marginBottom:heightScale(5)}}>
          <Pressable onPress={() => navigation.goBack('home')}>
            {back}
          </Pressable>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Your Orders</Text>
          {wishlistIcon}
        </View>

        <ScrollView style={{marginHorizontal: widthScale(33),marginTop:heightScale(30)}}
        showsVerticalScrollIndicator={false}
        >
         
         {data?.map((item)=>{
              return(
                <OrderItem orderId={item.id} orderDate={item.created} orderCost={item.cost}/>
              )
            })}


            </ScrollView>
    </SafeAreaView>
)

}