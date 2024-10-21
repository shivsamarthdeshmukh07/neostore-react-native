import React from 'react'
import { Pressable, SafeAreaView, Text, View } from 'react-native'
import globalStyles from '../../assets/styles/styles'
import { fontScale, heightScale, widthScale } from '../../assets/constants/metric'

export default ForgotPassword = () => {
    return(
        <SafeAreaView style={globalStyles.forgotPasswordConntainer}>
           <View style={{justifyContent:"center",alignItems:"center",height:heightScale(20),width:widthScale(20),borderWidth:1,borderRadius:10,borderColor:'#D6D6D6'}}>
            <Text style={{fontSize:16}}>X</Text>
           </View>
           <Text style={globalStyles.forgorPasswordTitleText}>Forgot Password </Text>

           <Text style={{fontSize:fontScale(14),marginTop:heightScale(40),color:"gray",marginBottom:heightScale(30)}}>
           Enter email associated with your account and we'll send and email with instruction to reset your password
           </Text>
           
           <InputField placeHolder={'Enter your email address'}/>

           <Pressable style={globalStyles.forgotPasswordButton}>
                    <Text style={{color:"white",alignSelf:"center",fontFamily:"Poppins-Bold",fontSize:fontScale(16)}}>Register</Text>
                </Pressable>


        </SafeAreaView>
    )
}