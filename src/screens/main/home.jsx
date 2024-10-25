import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

import globalStyles from '../../assets/styles/styles';
import Carousal from '../../components/carousal';
import {
  View,
  ScrollView,
  SafeAreaView,
  Text,
  Pressable,
  FlatList,
  Button,
  Image,
} from 'react-native';
import {fontScale, heightScale, widthScale} from '../../assets/constants/metric';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import axios from 'axios';
import {
    configureReanimatedLogger,
    ReanimatedLogLevel,
  } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../redux/neoSlice';
  
  // This is the default configuration
  configureReanimatedLogger({
    level: ReanimatedLogLevel.warn,
    strict: true, // Reanimated runs in strict mode by default
  });

const menu = <Icon name={'menu'} size={25}  />;
const wishlistIcon = <Icon name={'heart'} size={25} />;



const images = [
    require('../../assets/images/carousel/c1.jpg'),
    require('../../assets/images/carousel/c2.jpg'),
    require('../../assets/images/carousel/c3.png'),
    require('../../assets/images/carousel/c4.jpg'),
    require('../../assets/images/carousel/c5.png'),
  ];




const IconView =memo( ({icon, name,productId=1,iconfocus}) => {
    
      let id;
      if(name==="table"){
        id=1
      }else if(name==='chair'){
        id=2
      }else if(name==='bed'){
       id=3
      }else{
        id=4
      }
    const [focus,setFocus] = useState(false)
   
  return (
    <TouchableWithoutFeedback
      onPress={()=>productId(id)}
      onPressIn={()=>{setFocus(true)
        iconfocus(true)
      }}
      onPressOut={()=>{setFocus(false)
        iconfocus(false)
      }}
      style={{alignItems: 'center'}}>
      <View
        style={{
          borderWidth: 1,
          height: heightScale(45),
          width: widthScale(45),
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 25,
          borderColor: focus?"white":'gray',
          backgroundColor: focus?"black":'white'
        }}>
        <View
          style={{
            borderWidth: 1,
            height: heightScale(35),
            width: widthScale(35),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            borderColor: focus?"white":'gray',
          backgroundColor: focus?"black":'white'

          }}>
          {icon}
        </View>
      </View>
      <Text>{name}</Text>
    </TouchableWithoutFeedback>
  );
});
export default Home = ({navigation}) => {
  const data = useSelector(state => state.neoStore.userData)
  const dispatch = useDispatch()
  console.log("hiiiiiii",data)

  const [table, setTable] = useState(false);
  const [chair, setChair] = useState(false);
  const [sofa, setSofa] = useState(false);
  const [bed, setBed] = useState(false);
  const tableIcon = <Icon2 name={'table-furniture'} size={25} color={table?"white":"gray"}/>;
const chairIcon = <Icon2 name={'chair-rolling'} size={25} color={chair?"white":"gray"}  />;
const bedIcon = <Icon2 name={'bed-empty'} size={25} color={bed?"white":"gray"}/>;
const sofaIcon = <Icon2 name={'sofa'} size={25} color={sofa?"white":"gray"} />;
 
    const fetchData = async () => {
      await axios({
        method: 'GET',
        url: `http://staging.php-dev.in:8844/trainingapp/api/products/getList?product_category_id=${productId}`,
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res =>{ setData(res.data.data)
          fetch=false
        })
        .catch(e => console.log('error--', e));
    }
    //  console.log('token',data.data.access_token)
    const getuserData = useCallback(async () => {
      await axios({
        method: 'GET',
        url: 'http://staging.php-dev.in:8844/trainingapp/api/users/getUserData',
        
        headers: {
          'Content-Type': 'application/json',
          access_token:data.data.access_token
        },
      })
        .then(res =>dispatch(addUser(res.data.data)))
        .catch(e => console.log('get data error',data.data.access_token));
    })



    
    
 

      const [productId,setProductId]=useState(1)
    const [datas,setData]=useState([])
    useEffect(()=>{fetchData()
    },[productId])
    useEffect(()=>{getuserData()},[])

   
  


console.log("datttttttt",datas)
  return (
   <SafeAreaView style={globalStyles.homePageContainer}>
    <View
   style={{
    height:25,
     flexDirection: 'row',
     justifyContent: 'space-between',
     marginBottom: heightScale(15),
   }}>
   <Pressable onPress={() => navigation.openDrawer()}>{menu}</Pressable>
   <Text style={{fontSize: 20, fontWeight: 'bold'}}>NeoStoe</Text>
   {wishlistIcon}
 </View>
   <ScrollView showsVerticalScrollIndicator={false}>
 

 <View
   style={{
    marginTop:heightScale(15),
     flexDirection: 'row',
     justifyContent: 'space-between',
     marginBottom: heightScale(30),
   }}>
   <IconView icon={tableIcon} name={'table'} productId={setProductId} iconfocus={setTable} />
   <IconView icon={chairIcon} name={'chair'} productId={setProductId}  iconfocus={setChair}/>
   <IconView icon={bedIcon} name={'bed'} productId={setProductId}  iconfocus={setBed}/>
   <IconView icon={sofaIcon} name={'sofa'} productId={setProductId}  iconfocus={setSofa}/>
 </View>

 <Carousal images={images} carouselheight={175} paginationheight={150}/>

 <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:heightScale(15),marginBottom:heightScale(20)}}>
 <Text style={{fontSize:20,fontWeight:'500',}} >Feature Product</Text>
 <Pressable
   onPress={()=>navigation.navigate("gallery",{productId})}
 >
 <Text style={{fontSize:14,fontWeight:'200',marginTop:heightScale(5)}} >show all</Text>

 </Pressable>
 </View>
 <FlatList
 ItemSeparatorComponent={<View style={{height:20,width:20}}/>}
  showsHorizontalScrollIndicator={false}
   horizontal={true}
   data={datas}
   renderItem={({item}) => <Pressable 
      onPress={()=>navigation.navigate("details",{id:item.id})}
   style={{height:heightScale(208),width:widthScale(157)}}>
             <Image style={{height:heightScale(149),width:widthScale(141),resizeMode:'stretch',alignSelf:"center"}} source={{uri:`${item.product_images}`}}/> 
             <Text numberOfLines={1} style={{marginLeft:widthScale(7),marginTop:heightScale(8),fontSize:fontScale(14)}}>{item.name}</Text> 
             <Text  style={{marginLeft:widthScale(7),marginTop:heightScale(8),fontWeight:"800"}}>${item.cost}</Text> 

   </Pressable>}
 />
 <Image style={{height:heightScale(142),width:widthScale(335),resizeMode:"stretch",marginTop:heightScale(15)}} source={require('../../assets/images/Banner.png')}/>
 </ScrollView>
</SafeAreaView>
  );
};
