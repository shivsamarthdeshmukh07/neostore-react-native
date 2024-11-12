import { Platform, StyleSheet } from "react-native";
import { fontScale, heightScale, widthScale } from "../constants/metric";

const globalStyles = StyleSheet.create({
    //InputFieldComponent

    InputFieldComponent:{
        marginBottom:heightScale(10),
        // paddingTop:heightScale(18),
        flexDirection:"row",
        width :widthScale(310),
        height:heightScale(50),
        borderBottomWidth:1,
        borderColor:"#D6D6D6",      
    },

    authTextInpunt:{ 
      width:"92%",
      height:30,
      fontFamily:"Poppins-Regular",
      fontSize:fontScale(14),
       paddingVertical:0
    },

    //Register page

    registerConntainer:{
        flex:1,
       marginHorizontal:widthScale(33),
       marginTop:Platform.OS === "ios" ?heightScale(96) :heightScale(48),
       marginBottom:Platform.OS === "ios" ?heightScale(48) :heightScale(24),
     
    },

    registerTitleText:{
        color:"black",
      fontFamily:"Poppins-SemiBold",
      fontSize:24
    },

    registerButton:{
      alignSelf:'center',
       height:heightScale(51),
       width:widthScale(147),
       backgroundColor:"black",
       borderRadius:35,
       paddingTop:heightScale(15),
       marginTop:heightScale(30)
    },

    genderView:{
      alignItems:"center",
      flexDirection:"row",
      justifyContent:"space-between",
      marginTop:heightScale(10),
      width:widthScale(250)
    },

    genderBox:{
      borderWidth:1,
      height:heightScale(30),
      width:widthScale(70),
      borderColor:"#D6D6D6",
      borderRadius:12,
    },

    // login page 

    loginConntainer:{
      flex:1,
     marginHorizontal:widthScale(33),
     marginTop:Platform.OS === "ios" ?heightScale(96) :heightScale(48),
     marginBottom:Platform.OS === "ios" ?heightScale(48) :heightScale(24),
   
  },

  loginTitleText:{
      color:"black",
    fontFamily:"Poppins-Bold",
    fontSize:24
  },

  loginButton:{
    alignSelf:'center',
     height:heightScale(51),
     width:widthScale(147),
     backgroundColor:"black",
     borderRadius:35,
     paddingTop:heightScale(15),
     marginTop:heightScale(45)
  },

  //forgotpassword page

  forgotPasswordConntainer:{
    flex:1,
   marginHorizontal:widthScale(33),
   marginTop:Platform.OS === "ios" ?heightScale(80) :heightScale(40),
   marginBottom:Platform.OS === "ios" ?heightScale(48) :heightScale(24),
 
},
forgorPasswordTitleText:{
marginTop:heightScale(40),
color:"black",
fontFamily:"Poppins-SemiBold",
fontSize:24
},

forgotPasswordButton:{
  alignSelf:'center',
   height:heightScale(51),
   width:widthScale(147),
   backgroundColor:"black",
   borderRadius:35,
   paddingTop:heightScale(15),
   marginTop:heightScale(70)
},


//verification page 

verificationCodeConntainer:{
  flex:1,
 marginHorizontal:widthScale(33),
 marginTop:Platform.OS === "ios" ?heightScale(80) :heightScale(40),
 marginBottom:Platform.OS === "ios" ?heightScale(48) :heightScale(24),

},
VerificationCodeTitleText:{
  marginTop:heightScale(40),
  color:"black",
  fontFamily:"Poppins-SemiBold",
  fontSize:24
  },

//new password page

  newPasswordConntainer:{
    flex:1,
   marginHorizontal:widthScale(33),
   marginTop:Platform.OS === "ios" ?heightScale(80) :heightScale(40),
   marginBottom:Platform.OS === "ios" ?heightScale(48) :heightScale(24),
 
},
newPasswordTitleText:{
marginTop:heightScale(40),
color:"black",
fontFamily:"Poppins-SemiBold",
fontSize:24
},



//passwordChangeModal
passwordChangeButton:{
  alignSelf:'center',
   height:heightScale(51),
   width:widthScale(247),
   backgroundColor:"black",
   borderRadius:35,
   paddingTop:heightScale(15),
   marginTop:heightScale(30)
},



// home page 
homePageContainer:{
  flex:1,
  marginHorizontal:widthScale(31.5),
  backgroundColor:"white"
  // paddingTop:Platform.OS==='ios'?0:20
},


// carousel images
// carouselImages:{
// width:325,
// height:150,
// borderRadius:5,
// borderWidth:2,
// borderColor:"green",
// margin:12,
// resizeMode:'cover',
// backgroundColor:'red'
// }


})


 



    
export default globalStyles;

