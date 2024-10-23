import React, { useEffect, useState } from "react";
import { Image, Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import Icon3 from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Feather';
import { fontScale, heightScale, widthScale } from "../../assets/constants/metric";
import axios from "axios";
import Carousal from "../../components/carousal";
import Detailcarousal from "../../components/detailcarousal";



const back = <Icon3 name={'chevron-back'} size={25} />;
const wishlistIcon = <Icon name={'heart'} size={25} />;



export default Deatails=({navigation,route})=>{
  const [data, setData] = useState();


  const fetchData = async () => {
    await axios({
      method: 'GET',
      url: `http://staging.php-dev.in:8844/trainingapp/api/products/getDetail?product_id=${route.params.id}`,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        console.log('kk',res.data.data)
        setData(res.data.data);
      })
      .catch(e => console.log('error--', e));
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log("iiiiiiiii",data?.product_images)
  return(
    <SafeAreaView>
      <ScrollView style={{marginHorizontal: widthScale(33)}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Pressable onPress={() => navigation.goBack('home')}>
            {back}
          </Pressable>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Details</Text>
          {wishlistIcon}
        </View>
 <Detailcarousal images={data?.product_images} carouselheight={280} paginationheight={260} detail={true}/>
        <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:heightScale(30)}}>
          <Text style={{fontSize:fontScale(16),fontWeight:"500",width:widthScale(200)}} >{data?.name}</Text>
          <Text style={{fontSize:fontScale(18),fontWeight:"700"}}>${data?.cost}</Text>
        </View>
      </ScrollView>
      <View style={{position:"absolute",top:heightScale(710),height:heightScale(50),width:widthScale(200),backgroundColor:"black",borderRadius:40,justifyContent:"center",alignItems:"center"}}>
    <Text style={{fontSize:18,color:"white",fontWeight:"600"}}>Add To Cart</Text>
      </View>
    </SafeAreaView>
  )
}