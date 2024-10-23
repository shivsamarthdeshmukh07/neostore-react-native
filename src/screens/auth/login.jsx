import React, { useCallback, useState } from 'react'
import {Image, Pressable, SafeAreaView, Text,TouchableOpacity,View} from 'react-native'
import globalStyles from '../../assets/styles/styles'
import { fontScale, heightScale, widthScale } from '../../assets/constants/metric'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addUser } from '../../redux/neoSlice'


export default Login = ({navigation}) => {

  const dispatch = useDispatch()

    const [email ,setEmail]= useState()
    const [emailErr, setEmailErr] = useState('');
    const [password ,setPassword]= useState()
    const [passwordErr, setPasswordErr] = useState('');

    const emailPattern = /[a-zA-Z0-9\.\-_]+[@]+[a-z]+[\.]+[a-z]{2,3}/;
  const passwordPattern = /^(?=.{8,})(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=]).*$/;


  const handleEmailChange = useCallback((data) => {
    setEmail(data);
    if (!emailPattern.test(data)) {
      setEmailErr('Incorrect email format');
    } else {
      setEmailErr('');
    }
  }, [email]);

  const handlePasswordChange = useCallback((data) => {
    setPassword(data);
    if (!passwordPattern.test(data)) {
      setPasswordErr('Should have 1 capital letter, 1 symbol, 1 number, and minimum 8 characters in length');
    } else {
      setPasswordErr('');
    }
  }, [password]);

  const result={};
       
    const handleSubmit=async()=>{
   
        const data = new FormData();

        data.append("email",email)
        
        data.append("password",password)
        console.log(password)

          await axios.post("http://staging.php-dev.in:8844/trainingapp/api/users/login",data,
          {
            headers:{
              "Content-Type":"multipart/form-data"
            }
          }
        )
        .then(r=>dispatch(addUser(r.data)))
        .then(()=>navigation.navigate("home"))
        .catch(e=>console.log(e))

    }



    console.log("rrrrrrrr",result)
    // async function handleSubmit() {
    
    //   const formData = new FormData()
    //   formData.append('email', email)
    //   formData.append('password', password)
    //   // console.log(data)
    //   try {
    //   const result = await axios.post(
    //     'http://staging.php-dev.in:8844/trainingapp/api/users/login', 
    //     FormData , 
    //     {
    //       headers:{
    //         'Content-Type' : 'multipart/form-data'
    //       }
    //     }
    //   )
    //   console.log(result?.data)
    // } catch (error) {
    //   console.log(error)
    // }
  
    // }

    
    return(
        <SafeAreaView style={globalStyles.loginConntainer}>
             <Text style={globalStyles.loginTitleText}>Log into </Text>
             <Text style={globalStyles.loginTitleText}>your account </Text>
             <View style={{height:heightScale(70)}}>

             </View>
        <InputField placeHolder={'Email address'} getDataFromChild={handleEmailChange} value={"hiii@wek.kj"} />
            
             {emailErr ? <Text>{emailErr}</Text> : null}
             <InputField placeHolder={'Password'} icon={"lock"} getDataFromChild={handlePasswordChange} value={"Q@111111"} />

        {passwordErr ? <Text>{passwordErr}</Text> : null}

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