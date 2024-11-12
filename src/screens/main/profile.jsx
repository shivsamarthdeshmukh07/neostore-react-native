import react, { useState } from 'react';
import {
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  fontScale,
  heightScale,
  widthScale,
} from '../../assets/constants/metric';
import InputField from '../../components/inputField';
import globalStyles from '../../assets/styles/styles';
import DatePicker from '../../components/datePicker';
import { useDispatch, useSelector } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import ImgToBase64 from 'react-native-image-base64';
import axios from 'axios';
import { addUser, updateUser } from '../../redux/neoSlice';


const imageIcon= <Icon3 name={"camera-retro"} size={20} color={"white"}/>
export default Profile = ({navigation}) => {

  const userData = useSelector(state=> state.neoStore.userData)
  const dispatch = useDispatch();

  const [firstName,setFirstName]=useState(userData.user_data?.first_name)
  const [firstNameErr,setFirstNameErr]=useState()

  const [lastName,setLastName]=useState(userData.user_data?.last_name)
  const [lastNameErr,setLastNameErr]=useState()

  const [email,setEmail]=useState(userData.user_data?.email)
  const [emailErr,setEmailErr]=useState()

  const [mobile,setMobile]=useState(userData.user_data?.phone_no)
  const [mobileErr,setMobileErr]=useState()

  const [birthDate,setBirthDate]=useState()
  const [path,setPath] = useState(userData.user_data?.profile_pic)
  const[convertedPath,setConvertedPath]=useState();

  ImgToBase64.getBase64String(path)
  .then(base64String =>setConvertedPath(base64String))
  .catch(err => console.log("byeeeeee"));


//console.log("hvghcvhchn",userData.user_data)
// console.log("kkkkkkkkkkk",convertedPath)

const updateUserData = async (formdata) => {

  console.log("function",formdata)
  await axios({
    method: 'Post',
    url: 'http://staging.php-dev.in:8844/trainingapp/api/users/update',
    data:formdata,
    headers: {
      "Content-Type":"multipart/form-data",
      
      access_token:userData.user_data.access_token
    },
  })
    .then(res =>{console.log('res',res.data)
      dispatch(addUser(res.data.data))
     // navigation.navigate("home")
     
     
    })
    .catch(e => console.log('get data error',data.data.access_token));
}

  return (
    <SafeAreaView>
        
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: widthScale(33),
          marginBottom: heightScale(5),
        }}>
        <Pressable onPress={() => navigation.goBack('home')}>
          <Text> </Text>
        </Pressable>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Profile</Text>
        <Text> </Text>
      </View>
      <View
        style={{
          width: widthScale(312),
          height: heightScale(200),
          marginHorizontal: widthScale(33),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        

        <Image
          style={{
            height: heightScale(100),
            width: widthScale(100),
            resizeMode: 'stretch',
            borderRadius: 50,
            marginRight: widthScale(10),
          }}
          source={{uri:path}}
        />
        <Pressable 
         onPress={()=>{
          ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
          }).then(image => {
           setPath(image.path)
           console.log(image.path)
          });
         }}
         >
         <View style={{position:"absolute",top:-35,left:10,width:42,height:42,borderWidth:1,backgroundColor:"black",justifyContent:"center",alignItems:"center",borderRadius:25}}>
          {imageIcon}
          </View>
          
         </Pressable>
      </View>

      <View
        style={{
          width: widthScale(312),
          height: heightScale(250),
          marginHorizontal: widthScale(33),
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            height: heightScale(55),
          }}>
          <View>
            <InputField placeHolder={'First_name'} getDataFromChild={setFirstName} value={firstName}/>
        {firstNameErr ? <Text>{firstNameErr}</Text> : null}

          </View>

          <View>
            <InputField placeHolder={'Last_name'} getDataFromChild={setLastName} value={lastName}/>
        {lastNameErr ? <Text>{lastNameErr}</Text> : null}

          </View>
        </View>
        <InputField placeHolder={'Email'} getDataFromChild={setEmail} value={email}/>
        {emailErr ? <Text>{emailErr}</Text> : null}

        <InputField placeHolder={'Mobile_number'} getDataFromChild={setMobile} value={mobile}/>
        {mobileErr ? <Text>{mobileErr}</Text> : null}

       <View style={{flexDirection:"row", borderBottomWidth:1,borderColor:"#D6D6D6",paddingBottom:5}}>
        <Text style={{marginTop:20}}>Birth_date :    </Text>
        <DatePicker getDataFromChild={setBirthDate}/>
       </View>
      </View>
      <View style={{position:"absolute",top:Platform.OS==="ios"? heightScale(625):heightScale(580),width:widthScale(375),paddingHorizontal:widthScale(33),backgroundColor:"white",height:500}}>

      <TouchableOpacity style={{height:heightScale(45),width:widthScale(320),backgroundColor:"black",borderRadius:15,justifyContent:"center",alignItems:"center"}}
      onPress={()=>{
        let flag = true;
        if(firstName===""){
          setFirstNameErr("required")
          flag = false;
        }
         if(lastName===""){
          setLastNameErr("required")
          flag=false
        }
         if(email===""){
          setEmailErr("required")
          flag=false
        }
         if(mobile===""){
          setMobileErr("required")
          flag=false
        }
        
        if(flag){

          const formData = new FormData()
          formData.append("first_name",firstName)
          formData.append("last_name",lastName)
          formData.append("email",email)
          formData.append("dob",birthDate)
          formData.append("phone_no",mobile)
          formData.append("profile_pic",("data:image/jpeg;base64,"+convertedPath))


           updateUserData(formData)
         
        }
        
        }}
      >
    <Text style={{fontSize:18,color:"white",fontWeight:"600"}}>Update Profile</Text>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
