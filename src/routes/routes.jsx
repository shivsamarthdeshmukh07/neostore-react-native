import React from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import inputField from '../components/inputField';
import Register from '../screens/auth/register';
import Login from '../screens/auth/login';
import ForgotPassword from '../screens/auth/forgotPassword';
import VerificationCode from '../screens/auth/verificationCode';
import NewPassword from '../screens/auth/newPassword';
import PasswordChangeModal from '../components/passwordChangeModal';
import Home from '../screens/main/home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import tabNavigator from './tabNavigator';
import DrawerNavigator from './drawerNavigator';
import Gallery from '../screens/gallery';
import detail from '../screens/main/detail';
import search from '../screens/main/search';
import address from '../screens/main/address';
import deliveryAddress from '../screens/main/deliveryAddress';
import checkout from '../screens/main/checkout';
import orderDatail from '../screens/main/orderDatail';
import { useSelector } from 'react-redux';







export default Routes=()=>{
    const Stack = createNativeStackNavigator();
     let initial = "login"
    const data = useSelector(state => state.neoStore.userData)
console.log("route page",data.user_data?.access_token)
    if(data.user_data?.access_token){
        initial="home"
    }
     
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName={initial}>
                <Stack.Screen options={{headerShown:false}} name='login' component={Login}/>
                <Stack.Screen options={{headerShown:false}} name='register' component={Register}/>
                  <Stack.Screen options={{headerShown:false}} name='forgotPassword' component={ForgotPassword}/>
                  <Stack.Screen options={{headerShown:false}} name='verificationCode' component={VerificationCode}/>
                  <Stack.Screen options={{headerShown:false}} name='newPassword' component={NewPassword}/>
                  <Stack.Screen options={{headerShown:false}} name='gallery' component={Gallery}/>
                  <Stack.Screen options={{headerShown:false}} name='details' component={detail}/>
                  <Stack.Screen options={{headerShown:false}} name='search' component={search}/>
                  <Stack.Screen options={{headerShown:false}} name='address' component={address}/>
                  <Stack.Screen options={{headerShown:false}} name='deliveryAddress' component={deliveryAddress}/>
                  <Stack.Screen options={{headerShown:false}} name='checkout' component={checkout}/>
                  <Stack.Screen options={{headerShown:false}} name='passwordChangeModal' component={PasswordChangeModal}/>
                  <Stack.Screen options={{headerShown:false}} name='home' component={DrawerNavigator}/>
                  <Stack.Screen options={{headerShown:false}} name='orderDetail' component={orderDatail}/>





            </Stack.Navigator>
            
        </NavigationContainer>
    )
}