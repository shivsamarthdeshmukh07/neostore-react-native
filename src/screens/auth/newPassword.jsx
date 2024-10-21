import React from 'react'
import { Pressable, SafeAreaView, Text, View } from 'react-native'
import globalStyles from '../../assets/styles/styles'
import { fontScale, heightScale, widthScale } from '../../assets/constants/metric'

export default NewPassword = () =>{
    return(
        <SafeAreaView style={globalStyles.newPasswordConntainer}>
            <View style={{justifyContent:"center",alignItems:"center",height:heightScale(20),width:widthScale(20),borderWidth:1,borderRadius:10,borderColor:'#D6D6D6'}}>
            <Text style={{fontSize:16}}>X</Text>
           </View>
           <Text style={globalStyles.newPasswordTitleText}>Create new password </Text>

           <Text style={{fontSize:fontScale(14),marginTop:heightScale(40),color:"gray",marginBottom:heightScale(30)}}>
          Your new password must be diffrent from previously used password
           </Text>

           <InputField placeHolder={'New password'} icon={"lock"}/>
                <InputField placeHolder={'Confirm password'} icon={"lock"}/>

                <Pressable style={globalStyles.forgotPasswordButton}>
                    <Text style={{color:"white",alignSelf:"center",fontFamily:"Poppins-Bold",fontSize:fontScale(16)}}>Confirm</Text>
                </Pressable>
                <PasswordChangeModal/>
        </SafeAreaView>
    )
}