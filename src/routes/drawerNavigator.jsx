import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import home from '../screens/main/home'
import tabNavigator from './tabNavigator'

export default DrawerNavigator=()=>{
    const Drawer = createDrawerNavigator()

    return(
        <Drawer.Navigator>
            <Drawer.Screen name='home' component={tabNavigator}/>
        </Drawer.Navigator>
    )
}