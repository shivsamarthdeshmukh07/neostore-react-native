import React, { useCallback, useState } from "react";
import { Pressable, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { fontScale, heightScale, widthScale } from "../../assets/constants/metric";
import Icon3 from 'react-native-vector-icons/Ionicons';
import CheckBox from "@react-native-community/checkbox";
import { useDispatch } from "react-redux";
import { addAdress, updateAddress } from "../../redux/neoSlice";
import InputField from "../../components/inputField";



const back = <Icon3 name={'chevron-back'} size={25} />;


export default Address = ({route}) => {
        const data = route.params
     console.log("hiiiiii",route.params)
  const [house, setHouse] = useState(data?.houseNo);
  const [houseErr, setHouseErr] = useState('');

  const [street, setStreet] = useState(data?.street);
  const [streetErr, setStreetErr] = useState('');


  const [city, setCity] = useState(data?.city);
  const [cityErr, setCityErr] = useState('');


  const [state, setState] = useState(data?.state);
  const [stateErr, setStateErr] = useState('');


  const [pincode, setPincode] = useState(data?.pincode);
  const [pincodeErr, setPincodeErr] = useState('');

  const [addType, setAddType] = useState(data.type);
  const [addTypeErr, setAddTypeErr] = useState('');



  const [home, setHome] = useState(false);
  const [office, setOffice] = useState(false);
  const [other, setOther] = useState(false);

 const dispatch = useDispatch();

 
    return(
        <SafeAreaView>
             <View style={{flexDirection: 'row', justifyContent: 'space-between',marginHorizontal: widthScale(33),marginBottom:heightScale(5)}}>
          <Pressable onPress={() => navigation.goBack('home')}>
            {back}
          </Pressable>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Address</Text>
          <Text>  </Text>
        </View>
        <View style={{marginHorizontal:widthScale(33),marginTop:heightScale(60)}}>
        <InputField placeHolder={'House No./Building Name'} getDataFromChild={setHouse}  value={house}/>
        {houseErr ? <Text>{houseErr}</Text> : null}

        <InputField placeHolder={'Street Address'} getDataFromChild={setStreet} value={street} />
        {streetErr ? <Text>{streetErr}</Text> : null}

        <InputField placeHolder={'City'} getDataFromChild={setCity} value={city} />
        {cityErr ? <Text>{cityErr}</Text> : null}

        <InputField placeHolder={'State'} getDataFromChild={setState} value={state} />
        {stateErr ? <Text>{stateErr}</Text> : null}

        <InputField placeHolder={'Pincode'} getDataFromChild={setPincode}  value={pincode}/>
        {pincodeErr ? <Text>{pincodeErr}</Text> : null}

        <Text style={{marginTop:heightScale(20)}}>Address Type :</Text>

       <View style={{flexDirection:"row",marginTop:heightScale(20),justifyContent:"space-evenly"}}>
           
           <View style={{flexDirection:"row"}}>
           <CheckBox
           style={{height:20,width:20, marginRight:10,}}
           onCheckColor={"black"}
            value={home}
            onValueChange={() => {setHome(!home)
              setOffice(false)
              setOther(false)
              setAddType("Home")
            }}
            //for android
            onTintColor={"black"}
            tintColors={{true: 'white'}}
            //for iso
            tintColor={{true: 'red'}}
          />
              <Text>Home</Text>
           </View>

           <View style={{flexDirection:"row"}}>
           <CheckBox
           style={{height:20,width:20, marginRight:10,}}
           onCheckColor={"black"}
            value={office}
            onValueChange={() => {setHome(false)
              setOffice(!office)
              setOther(false)
              setAddType("Office")

            }}
            //for android
            onTintColor={"black"}
            tintColors={{true: 'white'}}
            //for iso
            tintColor={{true: 'red'}}
          />
              <Text>Office</Text>
           </View>

           <View style={{flexDirection:"row"}}>
           <CheckBox
           style={{height:20,width:20, marginRight:10,}}
           onCheckColor={"black"}
            value={other}
            onValueChange={() => {setHome(false)
              setOffice(false)
              setOther(!other)
              setAddType("Other")

            }}
            //for android
            onTintColor={"black"}
            tintColors={{true: 'white'}}
            //for iso
            tintColor={{true: 'red'}}
          />
              <Text>Other</Text>
           </View>


           
       </View>
       {addTypeErr ? <Text>{addTypeErr}</Text> : null}

        
       <TouchableOpacity style={{height:heightScale(45),width:widthScale(320),backgroundColor:"black",borderRadius:15,justifyContent:"center",alignItems:"center",marginTop:heightScale(70)}}
      onPress={()=>{
        let flag = true;
        if(house===""){
          setHouseErr("required")
          flag = false;
        }
         if(street===""){
          setStreetErr("required")
          flag=false
        }
         if(city===""){
          setCityErr("required")
          flag=false
        }
         if(state===""){
          setStateErr("required")
          flag=false
        }
        if(pincode===""){
          setPincodeErr("required")
          flag=false
        }
        if(addType===""){
          setAddTypeErr("required")
          flag=false
        }

        if(flag){
          const address ={
            "houseNo":house,
            "street":street,
            "city":city,
            "state":state,
            "pincode":pincode,
            "type":addType
          }
          data.city?dispatch(updateAddress(addAdress)):dispatch(addAdress(addAdress))
        }
      }}
      >
    <Text style={{fontSize:18,color:"white",fontWeight:"600"}}>Proceed to Checkout</Text>
      </TouchableOpacity>
             
        </View>
        </SafeAreaView>
    )
}