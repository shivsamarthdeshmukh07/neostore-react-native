import react from 'react'

import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import home from '../screens/main/home';
import order from '../screens/main/order';


export default TabNavigator=()=>{
    Tab = createBottomTabNavigator();

    return(
        <Tab.Navigator initialRouteName='home'>
            <Tab.Screen name="home"  component={home}/>
            <Tab.Screen name="order"  component={order}/>

        </Tab.Navigator>
    )
}