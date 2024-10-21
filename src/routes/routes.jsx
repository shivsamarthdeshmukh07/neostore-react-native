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




export default Routes=()=>{
    const Stack = createNativeStackNavigator();
    
     
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName='home'>
                <Stack.Screen options={{headerShown:false}} name='login' component={Login}/>
                <Stack.Screen options={{headerShown:false}} name='register' component={Register}/>
                  <Stack.Screen options={{headerShown:false}} name='forgotPassword' component={ForgotPassword}/>
                  <Stack.Screen options={{headerShown:false}} name='verificationCode' component={VerificationCode}/>
                  <Stack.Screen options={{headerShown:false}} name='newPassword' component={NewPassword}/>
                 
                  <Stack.Screen options={{headerShown:false}} name='passwordChangeModal' component={PasswordChangeModal}/>
                  <Stack.Screen options={{headerShown:false}} name='home' component={DrawerNavigator}/>
                  
            </Stack.Navigator>
            
        </NavigationContainer>
    )
}