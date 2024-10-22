import React, {useEffect, useRef, useState} from 'react';
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
  
  // This is the default configuration
  configureReanimatedLogger({
    level: ReanimatedLogLevel.warn,
    strict: true, // Reanimated runs in strict mode by default
  });

const menu = <Icon name={'menu'} size={25}  />;
const wishlistIcon = <Icon name={'heart'} size={25} />;
const tableIcon = <Icon2 name={'table-furniture'} size={25} color={"gray"}/>;
const chairIcon = <Icon2 name={'chair-rolling'} size={25} color={"gray"}  />;
const bedIcon = <Icon2 name={'bed-empty'} size={25} color={"gray"}/>;
const sofaIcon = <Icon2 name={'sofa'} size={25} color={"gray"} />;

// const images = [
//     require('../../assets/images/c1.png')
//     // require('../../assets/images/c1.png'),
//     // require('../../assets/images/c2.jpg'),
//     // require('../../assets/images/c3.png'),
//     // require('../../assets/images/c4.jpg'),
//     // require('../../assets/images/c5.png'),
//   ];



console.warn = () => {}
const IconView = ({icon, name,productId}) => {
    
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
    
  return (
    <TouchableWithoutFeedback
      onPress={()=>productId(id)}
      style={{alignItems: 'center'}}>
      <View
        style={{
          borderWidth: 1,
          height: heightScale(45),
          width: widthScale(45),
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 25,
          borderColor: 'gray',
        }}>
        <View
          style={{
            borderWidth: 1,
            height: heightScale(35),
            width: widthScale(35),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            borderColor: 'gray',
          }}>
          {icon}
        </View>
      </View>
      <Text>{name}</Text>
    </TouchableWithoutFeedback>
  );
};
export default Home = ({navigation}) => {
 
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
      };
    
 

      const [productId,setProductId]=useState(1)
    const [datas,setData]=useState([])
    useEffect(()=>{fetchData()
    },[productId])

   
  const [table, setTable] = useState(true);
  const [chair, setChair] = useState(false);
  const [sofa, setSofa] = useState(false);
  const [bed, setBed] = useState(false);


console.log("datttttttt",datas)
  return (
   <SafeAreaView style={globalStyles.homePageContainer}>
   <ScrollView scrollB>
 <View
   style={{
     flexDirection: 'row',
     justifyContent: 'space-between',
     marginBottom: heightScale(30),
   }}>
   <Pressable onPress={() => navigation.openDrawer()}>{menu}</Pressable>
   <Text style={{fontSize: 20, fontWeight: 'bold'}}>NeoStoe</Text>
   {wishlistIcon}
 </View>

 <View
   style={{
     flexDirection: 'row',
     justifyContent: 'space-between',
     marginBottom: heightScale(30),
   }}>
   <IconView icon={tableIcon} name={'table'} productId={setProductId} />
   <IconView icon={chairIcon} name={'chair'} productId={setProductId} />
   <IconView icon={bedIcon} name={'bed'} productId={setProductId}/>
   <IconView icon={sofaIcon} name={'sofa'} productId={setProductId}/>
 </View>

 <Carousal />

 <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:heightScale(15),marginBottom:heightScale(20)}}>
 <Text style={{fontSize:20,fontWeight:'500',}} >Feature Product</Text>
 <Text style={{fontSize:14,fontWeight:'100',marginTop:heightScale(5)}} >show all</Text>
 </View>
 <FlatList
 ItemSeparatorComponent={<View style={{height:20,width:20}}/>}
   horizontal={true}
   data={datas}
   renderItem={({item}) => <View style={{height:heightScale(208),width:widthScale(157)}}>
             <Image style={{height:heightScale(149),width:widthScale(141),resizeMode:'stretch',alignSelf:"center"}} source={{uri:`${item.product_images}`}}/> 
             <Text style={{marginLeft:widthScale(7),marginTop:heightScale(8),fontSize:fontScale(14)}}>{item.name}</Text> 
             <Text style={{marginLeft:widthScale(7),marginTop:heightScale(8),fontWeight:"800"}}>${item.cost}</Text> 

   </View>}
 />
 <Image style={{height:heightScale(142),width:widthScale(335),resizeMode:"stretch",marginTop:heightScale(15)}} source={require('../../assets/images/Banner.png')}/>
 </ScrollView>
</SafeAreaView>
  );
};
