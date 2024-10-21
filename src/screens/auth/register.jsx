import React, { useCallback, useState } from 'react';
import { Image, Keyboard, Pressable, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import globalStyles from '../../assets/styles/styles';
import InputField from '../../components/inputField';
import { fontScale, heightScale, widthScale } from '../../assets/constants/metric';
import axios from 'axios';

export default Register = ({ navigation }) => {
  const [name, setName] = useState('');
  const [nameErr, setNameErr] = useState('');

  const [lastName, setLastName] = useState('');
  const [lastNameErr, setLastNameErr] = useState('');

  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState('');

  const [password, setPassword] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordErr, setConfirmPasswordErr] = useState('');

  const [mobile, setMobile] = useState('');
  const [mobileErr, setMobileErr] = useState('');

  const [gender, setGender] = useState('');

  const [male, setMale] = useState(false);
  const [female, setFemale] = useState(false);

  const registerUser = async (data) => {
    
      let result = await fetch(
        'http://staging.php-dev.in:8844/trainingapp/api/users/register',
        
        {
          method:'POST',
          body:data,
          headers: {
'Accept': 'application/json',
'Content-type':'application/json'
          },
        },
      ).then(response=>console.log(response))
      .catch(e=>console.log(e))

// let result= await axios.post('http://staging.php-dev.in:8844/trainingapp/api/users/register',
//   data,
//   {
//     headers:{
//       'Content-Type': 'multipart/form-data'
//     }
//   }
// ).then(resp => console.log(resp)).catch(e=>console.log(e))
    
 };

  const namePattern = /[a-zA-Z]{3,}/;
  const emailPattern = /[a-zA-Z0-9\.\-_]+[@]+[a-z]+[\.]+[a-z]{2,3}/;
  const passwordPattern = /^(?=.{8,})(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=]).*$/;
  const mobilePattern = /(0|91)?[6-9][0-9]{9}/;

  const handleNameChange = useCallback((data) => {
    setName(data);
    if (!namePattern.test(data)) {
      setNameErr('Name should have more than 3 letters');
    } else {
      setNameErr('');
    }
  }, [name]);

  const handleLastNameChange = useCallback((data) => {
    setLastName(data);
    if (!namePattern.test(data)) {
      setLastNameErr('Last name should have more than 3 letters');
    } else {
      setLastNameErr('');
    }
  }, [lastName]);

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

  const handleConfirmPasswordChange = useCallback((data) => {
    setConfirmPassword(data);
  }, [password]);

  const handleMobileChange = useCallback((data) => {
    setMobile(data);
    if (!mobilePattern.test(data)) {
      setMobileErr('Invalid mobile number');
    } else {
      setMobileErr('');
    }
  });

  const cnfPassErr = () => {
    if (confirmPassword !== password) {
      return true;
    }
    return false;
  };

  const handleSubmit = () => {
    
    if (
      name === '' ||
      lastName === '' ||
      email === '' ||
      password === '' ||
      confirmPassword === '' ||
      mobile === '' ||
      gender === ''
    ) {
      setNameErr("This field is required");
      setLastNameErr("This field is required");
      setEmailErr("This field is required");
      setPasswordErr("This field is required");
      setConfirmPasswordErr("This field is required");
      setMobileErr("This field is required");
    } else {
      const data = new FormData();
      data.append("first_name", name);
      data.append("last_name", lastName);
      data.append("email", email);
      data.append("password", password);
      data.append("confirm_password", confirmPassword);
      data.append("gender", gender);
      data.append("phone_no",mobile);

      console.log("FormData:", data);
      registerUser(data);
    }
  };

  return (
    <ScrollView>
      <SafeAreaView style={globalStyles.registerConntainer}>
        <Text style={globalStyles.registerTitleText}>Create </Text>
        <Text style={globalStyles.registerTitleText}>your account </Text>
        <InputField placeHolder={'First name'} getDataFromChild={handleNameChange} value={"hiii"} />
        {nameErr ? <Text>{nameErr}</Text> : null}
        
        <InputField placeHolder={'Last name'} getDataFromChild={handleLastNameChange} value={"hiii"}/>
        {lastNameErr ? <Text>{lastNameErr}</Text> : null}

        <InputField placeHolder={'Email address'} getDataFromChild={handleEmailChange} value={"hiii@wek.kj"} />
        {emailErr ? <Text>{emailErr}</Text> : null}

        <InputField placeHolder={'Password'} icon={"lock"} getDataFromChild={handlePasswordChange} value={"Q@111111"} />
        {passwordErr ? <Text>{passwordErr}</Text> : null}

        <InputField placeHolder={'Confirm password'} icon={"lock"} getDataFromChild={handleConfirmPasswordChange} value={"Q@111111"} />
        {cnfPassErr() ? <Text>Password did not match</Text> : null}
        {confirmPasswordErr ? <Text>{confirmPasswordErr}</Text> : null}

        <InputField placeHolder={'Mobile number'} getDataFromChild={handleMobileChange} value={"9999999999"}/>
        {mobileErr ? <Text>{mobileErr}</Text> : null}

        <View style={globalStyles.genderView}>
          <Text>Gender :</Text>
          <TouchableOpacity style={[globalStyles.genderBox, {borderColor: male ? "black" : "#D6D6D6"}]}
            onPress={() => { setGender("M"); setMale(true); setFemale(false); }}>
            <Text style={{alignSelf:"center", marginTop:heightScale(5)}}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[globalStyles.genderBox, {borderColor: female ? "black" : "#D6D6D6"}]}
            onPress={() => { setGender("F"); setMale(false); setFemale(true); }}>
            <Text style={{alignSelf:"center", marginTop:heightScale(5)}}>Female</Text>
          </TouchableOpacity>
        </View>
        
        <Pressable style={globalStyles.registerButton} onPress={handleSubmit}>
          <Text style={{color:"white", alignSelf:"center", fontFamily:"Poppins-Bold", fontSize:fontScale(16)}}>Register</Text>
        </Pressable>

        <Text style={{marginHorizontal:widthScale(109), paddingTop:heightScale(25)}}>or sign up with</Text>

        <View style={{width: widthScale(166), height:heightScale(42), flexDirection:"row", justifyContent:"space-around", marginHorizontal:widthScale(75), marginTop:heightScale(15)}}>
          <Image style={{width:widthScale(25), height:heightScale(25), borderRadius:15}} source={require('../../assets/images/apple-logo.png')} />
          <Image style={{width:widthScale(25), height:heightScale(25), borderRadius:15}} source={require('../../assets/images/google-logo.png')} />
          <Image style={{width:widthScale(22), height:heightScale(22), borderRadius:15}} source={require('../../assets/images/facebook-logo.png')} />
        </View>
        
        <View style={{flexDirection:"row", justifyContent:"center", marginTop:heightScale(12)}}>
          <Text>Already have an account?  </Text>
          <TouchableOpacity onPress={() => navigation.navigate("login")}><Text style={{textDecorationLine:"underline"}}>Login</Text></TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};
