import react, {useEffect, useState} from 'react';
import {FlatList, Image, Pressable, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {fontScale, heightScale, widthScale} from '../assets/constants/metric';
import Icon3 from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const back = <Icon3 name={'chevron-back'} size={25} />;
const notification = <Icon3 name={'notifications-outline'} size={25} />;

export default Gallery = ({navigation, route}) => {
  const [data, setData] = useState();
  console.log(route.params.productId);
  const name =
    route.params.productId == 1
      ? 'Table'
      : route.params.productId == 2
      ? 'Chair'
      : route.params.productId == 3
      ? 'Sofa'
      : 'Bed';

  const fetchData = async () => {
    await axios({
      method: 'GET',
      url: `http://staging.php-dev.in:8844/trainingapp/api/products/getList?product_category_id=${route.params.productId}`,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        setData(res.data.data);
      })
      .catch(e => console.log('error--', e));
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <SafeAreaView style={{marginHorizontal: widthScale(33)}}>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Pressable onPress={() => navigation.navigate('home')}>
            {back}
          </Pressable>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>{name}</Text>
          {notification}
        </View>
        <Text
          style={{
            marginTop: heightScale(15),
            fontSize: fontScale(16),
            fontWeight: '500',
          }}>
          Found {data?.length} Results
        </Text>
        <View style={{flexDirection:"row",flexWrap:"wrap"}}>
        
        <FlatList
        numColumns={2}

  
   data={data}
   renderItem={({item}) => <Pressable 
      onPress={()=>navigation.navigate("details",{id:item.id})}
   style={{height:heightScale(208),width:widthScale(157),marginTop:heightScale(20)}}>
             <Image style={{height:heightScale(149),width:widthScale(141),resizeMode:'stretch',alignSelf:"center"}} source={{uri:`${item.product_images}`}}/> 
             <Text numberOfLines={1} style={{marginLeft:widthScale(7),marginTop:heightScale(8),fontSize:fontScale(14)}}>{item.name}</Text> 
             <Text  style={{marginLeft:widthScale(7),marginTop:heightScale(8),fontWeight:"800"}}>${item.cost}</Text> 

   </Pressable>}
 />
         </View>
      </ScrollView>
    </SafeAreaView>
  );
};



