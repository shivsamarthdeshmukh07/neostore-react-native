import React, { useState } from 'react'
import {Image, Pressable, SafeAreaView, Text,TouchableOpacity,View} from 'react-native'
import globalStyles from '../../assets/styles/styles'
import { fontScale, heightScale, widthScale } from '../../assets/constants/metric'
import axios from 'axios'


export default Login = ({navigation}) => {

    const [email ,setEmail]= useState()
    const [password ,setPassword]= useState()
       
    const handleSubmit=()=>{
        const data = new FormData();

        data.append("email",email)
        data.append("password",password)

        const result = axios.post('https://staging.php-dev.in:8844/trainingapp/api/users/login',
            {
                email: email,
                password: password,
              },
              {
                headers: {
                  'Content-Type': 'application/json', // Send data as JSON
                },
              }
            
        ).then(resp => console.log(resp)).catch(e=>console.log(e))

    }
    return(
        <SafeAreaView style={globalStyles.loginConntainer}>
             <Text style={globalStyles.loginTitleText}>Log into </Text>
             <Text style={globalStyles.loginTitleText}>your account </Text>
             <View style={{height:heightScale(70)}}>

             </View>
             <InputField placeHolder={'Email address'} getDataFromChild={setEmail}/>
             <InputField placeHolder={'Password'} icon={"lock"} getDataFromChild={setPassword}/>
             <TouchableOpacity style={{alignItems:"flex-end",marginTop:heightScale(20)}}><Text>Forgot Password?</Text></TouchableOpacity>

             <Pressable style={globalStyles.loginButton}
                onPress={handleSubmit}
             >
                    <Text style={{color:"white",alignSelf:"center",fontFamily:"Poppins-Bold",fontSize:fontScale(16)}}>Login</Text>
                </Pressable>
                
                <Text style={{marginHorizontal:widthScale(114.5),paddingTop:heightScale(25)}}>or log in with</Text>
              
                <View style={{width: widthScale(166),height:heightScale(42),flexDirection:"row",justifyContent:"space-around",marginHorizontal:widthScale(70),marginTop:heightScale(30)}}>
                    <Image style={{width:widthScale(25),height:heightScale(25),borderRadius:15}} source={require('../../assets/images/apple-logo.png')}/>
                   

                    <Image style={{width:widthScale(25),height:heightScale(25),borderRadius:15}} source={require('../../assets/images/google-logo.png')}/>
                    

                    <Image style={{width:widthScale(22),height:heightScale(22),borderRadius:15}} source={require('../../assets/images/facebook-logo.png')}/>
                    
                  </View>

                  <View style={{flexDirection:"row",justifyContent:"center",marginTop:heightScale(60)}}>
                <Text>Don't have an account?  </Text>
                <TouchableOpacity onPress={()=>navigation.navigate("register")}><Text style={{textDecorationLine:"underline"}}>Register</Text></TouchableOpacity>
               </View>

        </SafeAreaView>
        
    )
}