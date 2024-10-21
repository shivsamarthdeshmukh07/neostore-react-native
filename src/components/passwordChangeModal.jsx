import React, { useState } from "react";
import { Image, Modal, Pressable, SafeAreaView, Text, View } from "react-native";
import { fontScale, heightScale } from "../assets/constants/metric";
import globalStyles from "../assets/styles/styles";

export default PasswordChangeModal = () => {
    const [modal, setModal] = useState(true);
    return(
        <SafeAreaView>
            <Modal
             transparent={true}
             visible={modal}
            >
            <View style={{height:heightScale(350),marginTop:heightScale(465),borderTopLeftRadius:50,borderTopRightRadius:50,alignItems:"center"}}>
                <Image style={{marginTop:heightScale(50)}} source={require('../assets/images/password-change-logo.png')}/>  
                <Text style={{fontSize:fontScale(17),marginTop:heightScale(30)}}>Your password has been changed</Text>
                <Text style={{fontSize:fontScale(12),marginTop:heightScale(30)}}>Wewlcome back! Discover now!</Text>
                <Pressable style={globalStyles.passwordChangeButton}>
                    <Text style={{color:"white",alignSelf:"center",fontFamily:"Poppins-Bold",fontSize:fontScale(16)}}>Browse login</Text>
                </Pressable>
            </View>
            </Modal>
        </SafeAreaView>
    )
}