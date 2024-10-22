import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import home from '../screens/main/home'
import tabNavigator from './tabNavigator'

export default DrawerNavigator=()=>{
    const Drawer = createDrawerNavigator()

    return(
        <Drawer.Navigator screenOptions={{headerShown:false}}>
            <Drawer.Screen  name='avb' component={tabNavigator}/>
        </Drawer.Navigator>
    )
}