import react, { useEffect, useState } from 'react'

import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import home from '../screens/main/home';
import order from '../screens/main/order';
import search from '../screens/main/search';
import mapComp from '../screens/main/mapComp';
import cart from '../screens/main/cart';
import profile from '../screens/main/profile';


import Icon from 'react-native-vector-icons/Octicons';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/Ionicons';
import { Platform, Text, View } from 'react-native';
import { heightScale, widthScale } from '../assets/constants/metric';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import axios from 'axios';








const mapIcon = <Icon2 name={"map-pin"} size={25}/>
const cartIcon = <Icon3 name={"cart-outline"} size={25}/>
const profileIcon = <Icon1 name={"user-o"} size={25}/>

export default TabNavigator=()=>{

    const [data,setData]=useState({})
    const navigation = useNavigation();
  const userData = useSelector(state => state.neoStore.userData)

    const getCartItems = async () => {
        console.log("count",data)

        await axios({
          method: 'GET',
          url: 'http://staging.php-dev.in:8844/trainingapp/api/cart',
          
          headers: {
            'Content-Type': 'application/json',
            access_token:userData.user_data.access_token
          },
        })
          .then(res =>{setData(res.data)
          })
          .catch(e => console.log('get data error',data.data.access_token));
      }
     
    // useEffect(() => {
    //     const unsubscribe = navigation.addListener('focus', () => {
    //        getCartItems()
    //     });
    //     return unsubscribe;
    //   }, [navigation,subTotal]);
      useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
           getCartItems()
        });
        return unsubscribe;
      }, [navigation]);

//       useEffect(() => {
    
//         getCartItems()
     
     
//    },);
      


    Tab = createBottomTabNavigator();

    return(
        <Tab.Navigator initialRouteName='home'
         options={{headerShown:false,}}
         tabBarOptions={{showLabel:false,}}
         
         >
            <Tab.Screen options={{headerShown:false,
                tabBarIcon:({focused})=>{
                    return(
                    <View style={{justifyContent:'center',alignItems:"center",top:Platform.OS==='ios'? 10:0}}>
                          <Icon name={"home"} size={22} color={focused?"black":"gray"}/>
                           <Text style={{fontSize:12,color:"black"}}>Home</Text>
                    </View>
     ) }
     
            }} name="home" component={home}
               
            />
            <Tab.Screen options={{headerShown:false,
                tabBarIcon:({focused})=>{
                    return(
                    <View style={{justifyContent:'center',alignItems:"center",top:Platform.OS==='ios'? 10:0}}>
                          <Icon name={"search"} size={25} color={focused?"black":"gray"}/>
                           <Text style={{fontSize:12,color:"black"}}>Search</Text>
                    </View>
    )}
            }} name="search"  component={search}
            
            />
            <Tab.Screen options={{headerShown:false,
                tabBarIcon:({focused})=>{
                    return(
                    <View style={{justifyContent:'center',alignItems:"center",top:-20,height:heightScale(60),width:widthScale(60),backgroundColor:"white",borderRadius:30}}>
                          <Icon2 name={"map-pin"} size={25} color={focused?"black":"gray"}/>
                          <Text style={{fontSize:12,color:"black"}}>Map</Text>
                    </View>
     ) }
            }} name="map"  component={mapComp}/>
            <Tab.Screen options={{headerShown:false,
                tabBarIcon:({focused})=>{
                    return(
                    <View style={{justifyContent:'center',alignItems:"center",top:Platform.OS==='ios'? 10:0}}>
                          <Icon3 name={"cart-outline"} size={25} color={focused?"black":"gray"}/>
                          <Text style={{fontSize:12,color:"black"}}>Cart</Text>
                    </View>
    )},
    tabBarBadge:data?.count
            }} name="cart"  component={cart}/>
            <Tab.Screen options={{headerShown:false,tabBarIcon:({focused})=>{
                 return(
                    <View style={{justifyContent:'center',alignItems:"center",top:Platform.OS==='ios'? 10:0}}>
                         <Icon1 name={"user-o"} size={25} color={focused?"black":"gray"}/>
                          <Text style={{fontSize:12,color:"black"}}>Profile</Text>
                    </View>
     ) },
     
     }} name="profile"  component={profile}/>

            

        </Tab.Navigator>
    )
}