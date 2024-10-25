import React, { useCallback, useState } from 'react';
import { Image, Pressable, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import globalStyles from '../../assets/styles/styles';
import InputField from '../../components/inputField';
import { fontScale, heightScale, widthScale } from '../../assets/constants/metric';

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
    console.log('data----', data);
    try {
      let result = await fetch(
        'http://staging.php-dev.in:8844/trainingapp/api/users/register',
        {
          method: 'POST',
          body: data,
          headers: {
            'Accept': 'application/json',
          },
        }
      );

      if (!result.ok) {
        throw new Error(`HTTP error! status: ${result.status}`);
      }

      let responseData = await result.json();
      console.log('Response Data:', responseData);
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  const namePattern = /[a-zA-Z]{3,}/;
  const emailPattern = /[a-zA-Z0-9\.\-_]+[@]+[a-z]+[\.]+[a-z]{2,3}/;
  const passwordPattern = /^(?=.{8,})(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=]).*$/;
  const mobilePattern = /(0|91)?[6-9][0-9]{9}/;

  const handleNameChange = useCallback((data) => {
    setName(data);
    setNameErr(namePattern.test(data) ? '' : 'Name should have more than 3 letters');
  }, []);

  const handleLastNameChange = useCallback((data) => {
    setLastName(data);
    setLastNameErr(namePattern.test(data) ? '' : 'Last name should have more than 3 letters');
  }, []);

  const handleEmailChange = useCallback((data) => {
    setEmail(data);
    setEmailErr(emailPattern.test(data) ? '' : 'Incorrect email format');
  }, []);

  const handlePasswordChange = useCallback((data) => {
    setPassword(data);
    setPasswordErr(passwordPattern.test(data) ? '' : 'Should have 1 capital letter, 1 symbol, 1 number, and minimum 8 characters in length');
  }, []);

  const handleConfirmPasswordChange = useCallback((data) => {
    setConfirmPassword(data);
  }, []);

  const handleMobileChange = useCallback((data) => {
    setMobile(data);
    setMobileErr(mobilePattern.test(data) ? '' : 'Invalid mobile number');
  }, []);

  const cnfPassErr = () => confirmPassword !== password;

  const handleSubmit = () => {
    let flag = true;

    setNameErr('');
    setLastNameErr('');
    setEmailErr('');
    setPasswordErr('');
    setConfirmPasswordErr('');
    setMobileErr('');

    
    if (!name) {
    setNameErr("This field is required");
    flag = false;
    }
    
      if (!lastName) {
     setLastNameErr("This field is required");
     flag = false;
    }
    
    if (!email) {
    setEmailErr("This field is required");
        flag = false;
    }
    if (!password) {
      setPasswordErr("This field is required");
        flag = false;
       }
       
      if (!confirmPassword) {
      setConfirmPasswordErr("This field is required");
     flag = false;
      }


    if (!mobile) {
     setMobileErr("This field is required");
      flag = false;
      }

    if (!gender) {
    hasError = false;
    }

    if (confirmPassword !== password) {
      setConfirmPasswordErr("Passwords do not match");
      return;
      }

  
    if (flag) {

  
   

    const data = new FormData();
    data.append("first_name", name);
    data.append("last_name", lastName);
    data.append("email", email);
    data.append("password", password);
    data.append("confirm_password", confirmPassword);
    data.append("gender", gender);
    data.append("phone_no", mobile);

    console.log("FormData:", data);
    registerUser(data);
    }
};


  return (
    <ScrollView>
      <SafeAreaView style={globalStyles.registerConntainer}>
        <Text style={globalStyles.registerTitleText}>Create </Text>
        <Text style={globalStyles.registerTitleText}>your account </Text>
        <InputField placeHolder={'First name'} getDataFromChild={handleNameChange} value={name} />
        {nameErr ? <Text>{nameErr}</Text> : null}
        
        <InputField placeHolder={'Last name'} getDataFromChild={handleLastNameChange} value={lastName} />
        {lastNameErr ? <Text>{lastNameErr}</Text> : null}

        <InputField placeHolder={'Email address'} getDataFromChild={handleEmailChange} value={email} />
        {emailErr ? <Text>{emailErr}</Text> : null}

        <InputField placeHolder={'Password'} icon={"lock"} getDataFromChild={handlePasswordChange} value={password} />
        {passwordErr ? <Text>{passwordErr}</Text> : null}

        <InputField placeHolder={'Confirm password'} icon={"lock"} getDataFromChild={handleConfirmPasswordChange} value={confirmPassword} />
        {cnfPassErr() ? <Text>Password did not match</Text> : null}

        <InputField placeHolder={'Mobile number'} getDataFromChild={handleMobileChange} value={mobile} />
        {mobileErr ? <Text>{mobileErr}</Text> : null}

        <View style={globalStyles.genderView}>
          <Text>Gender :</Text>
          <TouchableOpacity style={[globalStyles.genderBox, { borderColor: male ? "black" : "#D6D6D6" }]}
            onPress={() => { setGender("M"); setMale(true); setFemale(false); }}>
            <Text style={{ alignSelf: "center", marginTop: heightScale(5) }}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[globalStyles.genderBox, { borderColor: female ? "black" : "#D6D6D6" }]}
            onPress={() => { setGender("F"); setMale(false); setFemale(true); }}>
            <Text style={{ alignSelf: "center", marginTop: heightScale(5) }}>Female</Text>
          </TouchableOpacity>
        </View>
        
        <Pressable style={globalStyles.registerButton} onPress={handleSubmit}>
          <Text style={{ color: "white", alignSelf: "center", fontFamily: "Poppins-Bold", fontSize: fontScale(16) }}>Register</Text>
        </Pressable>

        <Text style={{ marginHorizontal: widthScale(108), paddingTop: heightScale(25) }}>or sign up with</Text>

         <View style={{ width: widthScale(166), height: heightScale(42), flexDirection: "row", justifyContent: "space-around", marginHorizontal: widthScale(75), marginTop: heightScale(15) }}>
          <Image style={{ width: widthScale(25), height: heightScale(25), borderRadius: 15 }} source={require('../../assets/images/apple-logo.png')} />
          <Image style={{ width: widthScale(25), height: heightScale(25), borderRadius: 15 }} source={require('../../assets/images/google-logo.png')} />
          <Image style={{ width: widthScale(22), height: heightScale(22), borderRadius: 15 }} source={require('../../assets/images/facebook-logo.png')} />
         </View>
        
         < View style={{ flexDirection: "row", justifyContent: "center", marginTop: heightScale(12) }}>
          <Text>Already have an account?  </Text>
          <TouchableOpacity onPress={() => navigation.navigate("login")}><Text style={{ textDecorationLine: "underline" }}>Login</Text></TouchableOpacity>
         </View>
      </SafeAreaView>
    </ScrollView>
  );
};
