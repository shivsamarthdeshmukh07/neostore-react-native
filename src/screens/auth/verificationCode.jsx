import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import globalStyles from '../../assets/styles/styles'
import { fontScale, heightScale, widthScale } from '../../assets/constants/metric'
import BackIcon from 'react-native-vector-icons/MaterialCommunityIcons';
const myIcon = <BackIcon name="backspace-outline" size={20}  />;
export default VerificationCode = () =>{
    const [otp, setOtp]=useState([])
    return(
        <SafeAreaView style={globalStyles.verificationCodeConntainer}>
                       <View style={{justifyContent:"center",alignItems:"center",height:heightScale(20),width:widthScale(20),borderWidth:1,borderRadius:10,borderColor:'#D6D6D6'}}>
            <Text style={{fontSize:16}}>{'<'}</Text>
           </View>
           <Text style={globalStyles.VerificationCodeTitleText}>Verification Code </Text>

           <Text style={{fontSize:fontScale(14),marginTop:heightScale(40),color:"gray",marginBottom:heightScale(30)}}>
           Please enter the verification code we sent to your email address
           </Text>

           <View style={{marginTop:heightScale(40),height:heightScale(30),flexWrap:"wrap",alignContent:"space-around",width:"80%",marginHorizontal:widthScale(20)}}>
                <TextInput style={{borderWidth:1,width:widthScale(35),height:heightScale(35),borderRadius:20,backgroundColor:otp[0]?"purple":"white",borderColor:"gray"}}></TextInput>
                <TextInput style={{borderWidth:1,width:widthScale(35),height:heightScale(35),borderRadius:20,backgroundColor:otp[1]?"purple":"white",borderColor:"gray"}}></TextInput>
                <TextInput style={{borderWidth:1,width:widthScale(35),height:heightScale(35),borderRadius:20,backgroundColor:otp[2]?"purple":"white",borderColor:"gray"}}></TextInput>
                <TextInput style={{borderWidth:1,width:widthScale(35),height:heightScale(35),borderRadius:20,backgroundColor:otp[3]?"purple":"white",borderColor:"gray"}}></TextInput>

            </View>


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    numberButtons:{
        marginTop:10,backgroundColor:"white",width:45,height:45,borderRadius:25,justifyContent:"center",alignItems:"center",shadowOffset:{height:3},shadowColor:"gray",shadowOpacity:0.5
    }
})