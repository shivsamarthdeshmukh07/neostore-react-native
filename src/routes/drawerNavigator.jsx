import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import React from 'react'
import home from '../screens/main/home'
import tabNavigator from './tabNavigator'
import { Image, Text, View } from 'react-native'
import { fontScale, heightScale, widthScale } from '../assets/constants/metric'

import Icon from 'react-native-vector-icons/Octicons';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux'



export default DrawerNavigator=()=>{
    const Drawer = createDrawerNavigator()
    const data = useSelector(state=>state.neoStore.userData)
       console.log(data.user_data)
    return(
        <Drawer.Navigator screenOptions={{headerShown:false,drawerStyle:{width:widthScale(293)}}}
        
        drawerContent={props =>(
            <DrawerContentScrollView {...props}>
                 <View style={{width:widthScale(225),height:heightScale(70),marginLeft:widthScale(30),marginTop:heightScale(62),flexDirection:"row"}}>
                    
                     <Image style={{height:heightScale(70),width:widthScale(70),resizeMode:"stretch",borderRadius:40,marginRight:widthScale(10)}} source={{uri:data.user_data.profile_pic}}/>
                      <View style={{justifyContent:"space-evenly"}}>
                        <Text numberOfLines={2} style={{width:widthScale(140),fontSize:fontScale(16),fontWeight:"700"}}>{data.user_data.first_name} {data.user_data.first_name}</Text>
                        <Text style={{fontSize:fontScale(14),fontWeight:"500"}}>{data.user_data.email}</Text>

                      </View>

                 </View>

                 
                
                 <DrawerItem
                 icon={()=>(
                    <Icon name={"home"} size={22} />
                 )}
                 style={{width:widthScale(293),height:heightScale(45),paddingLeft:widthScale(18),marginTop:heightScale(55)}}
                 label={"Home page"}
                 onPress={()=>props.navigation.navigate("Home page")}
                 />

                  <DrawerItem
                 icon={()=>(
                    <Icon name={"search"} size={25} />

                 )}
                 style={{width:widthScale(293),height:heightScale(45),paddingLeft:widthScale(18),}}
                 label={"Discover"}
                 onPress={()=>props.navigation.navigate("Discover")}
                 />

                  <DrawerItem
                 icon={()=>(
                    
                    <Icon2 name={"shopping-bag"} size={25} />
                    

                 )}
                 style={{width:widthScale(293),height:heightScale(45),paddingLeft:widthScale(18),}}
                 label={"My order"}
                 onPress={()=>props.navigation.navigate("Home page")}
                 />

                <DrawerItem
                 icon={()=>(
                    <Icon1 name={"user-o"} size={25} />
                  

                 )}
                 style={{width:widthScale(293),height:heightScale(45),paddingLeft:widthScale(18),}}
                 label={"My profile"}
                 onPress={()=>props.navigation.navigate("My profile")}
                 />

                 <Text style={{fontSize:14,marginTop:heightScale(20),marginLeft:widthScale(30)}}>Other</Text>
                 
                 <DrawerItem
                 icon={()=>(
                    <Icon3 name={"settings-outline"} size={25} />
                  

                 )}
                 style={{width:widthScale(293),height:heightScale(45),paddingLeft:widthScale(18),marginTop:heightScale(20)}}
                 label={"Setting"}
                 onPress={null}
                 />
                 
                 <DrawerItem
                 icon={()=>(
                    <Icon3 name={"mail-outline"} size={25} />
                  

                 )}
                 style={{width:widthScale(293),height:heightScale(45),paddingLeft:widthScale(18),}}
                 label={"Support"}
                 onPress={null}
                 />
                 
                 <DrawerItem
                 icon={()=>(
                    <Icon2 name={"info"} size={25} />
                  

                 )}
                 style={{width:widthScale(293),height:heightScale(45),paddingLeft:widthScale(18),}}
                 label={"About us"}
                 onPress={null}
                 />
                
                
                 
            </DrawerContentScrollView>
    )}
        >
            <Drawer.Screen  name='Home page' component={tabNavigator}/>
            <Drawer.Screen  name='Discover' component={tabNavigator}/>
            <Drawer.Screen  name='My order' component={tabNavigator}/>
            <Drawer.Screen  name='My profile' component={tabNavigator}/>
            
        </Drawer.Navigator>
    )
}