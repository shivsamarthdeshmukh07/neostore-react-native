import React, { useEffect, useState } from "react";
import { FlatList, Image, Pressable, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Icon3 from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Feather';
import { fontScale, heightScale, widthScale } from "../../assets/constants/metric";
import axios from "axios";
import Carousal from "../../components/carousal";
import Detailcarousal from "../../components/detailcarousal";
import StarRating from 'react-native-star-rating-widget';
import { useSelector } from "react-redux";




const back = <Icon3 name={'chevron-back'} size={25} />;
const wishlistIcon = <Icon name={'heart'} size={25} />;



export default Details=({navigation,route})=>{
  const [data, setData] = useState('');
  const [products,setProducts]=useState([])
  const[quantity,setQuantity]=useState(1)

  const userData = useSelector(state => state.neoStore.userData)

    console.log("dataaaaaa",userData.user_data.access_token)
  useEffect(() => {
    fetchData();
  }, []);

  const fetchProducts = async (id) => {

    await axios({
      method: 'GET',
      url: `http://staging.php-dev.in:8844/trainingapp/api/products/getList?product_category_id=${id}`,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res =>{ setProducts(res?.data?.data)
           console.log("ppppppppppppp")
      })
      .catch(e => console.log('error--', e));
  }

  const addToCart = async () => {
    const formData = new FormData();
    formData.append("product_id",data.id)
    formData.append("quantity",quantity)
    console.log("formdata",formData)
    await axios({
      method: 'POST',
      data: formData,
      url: `http://staging.php-dev.in:8844/trainingapp/api/addToCart`,
      headers: {
        
         "Content-Type":"multipart/form-data",
        access_token:userData.user_data.access_token
      },
    })
      .then(res =>{ 
           console.log("added to cart")
      })
      .catch(e => console.log('error--', e));
  }



  
  

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
        return res;
      }).then(res=>{fetchProducts(res?.data?.data.product_category_id)
        console.log("vvvvvvvvvvvvvvvv",res?.data?.data?.data.product_category_id)
      })
      .catch(e => console.log('error@@@', e));
  };

 
  console.log("iiiiiiiiihii",data)
  const star = data?.rating ? data?.rating : 1
  return(
    <SafeAreaView >
       <View style={{flexDirection: 'row', justifyContent: 'space-between',marginHorizontal: widthScale(33),marginBottom:heightScale(5)}}>
          <Pressable onPress={() => navigation.goBack('home')}>
            {back}
          </Pressable>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Details</Text>
          {wishlistIcon}
        </View>
      <ScrollView style={{marginHorizontal: widthScale(33),height:heightScale(635)}} showsVerticalScrollIndicator={false}>
     
 <Detailcarousal images={data?.product_images} carouselheight={280} paginationheight={260} detail={true}/>
        <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:heightScale(30)}}>
          <Text style={{fontSize:fontScale(16),fontWeight:"500",width:widthScale(200)}} >{data?.name}</Text>
          <Text style={{fontSize:fontScale(18),fontWeight:"700"}}>${data?.cost}</Text>
        </View>
        <View style={{flexDirection:'row',paddingTop:heightScale(5)}}>
        <StarRating
        starSize={22}
        rating={star}
        color="black"
        starStyle={{marginLeft:0}}
        onChange={()=>{}}
        />
        <Text style={{paddingTop:heightScale(6),fontSize:fontScale(11)}}>({(data?.view_count/1000).toFixed(1)}K)</Text>
        </View>

<View style={{flexDirection:"row"}}>
<Text style={{marginTop:heightScale(10),color:"gray"}}>Color</Text>
<Text style={{marginTop:heightScale(10),marginLeft:widthScale(155),color:"gray"}}>Size</Text>

</View>
         <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:heightScale(5),}}>
            <View style={{flexDirection:"row",justifyContent:"space-between",width:widthScale(120),}}>
            <View style={{height:heightScale(20),width:widthScale(20),backgroundColor:"brown",borderRadius:15}}></View>
            <View style={{height:heightScale(20),width:widthScale(20),backgroundColor:"black",borderRadius:15}}></View>
            <View style={{height:heightScale(20),width:widthScale(20),backgroundColor:"orange",borderRadius:15}}></View>
            <View style={{height:heightScale(20),width:widthScale(20),backgroundColor:"gray",borderRadius:15}}></View>
            </View>
            <View style={{flexDirection:"row",justifyContent:"space-between",width:widthScale(120),}}>
            <View style={{justifyContent:"center",alignItems:"center",height:heightScale(20),width:widthScale(25),borderWidth:0.5,borderRadius:15}}>
              <Text>S</Text>
            </View>
            <View style={{justifyContent:"center",alignItems:"center",height:heightScale(20),width:widthScale(25),borderWidth:0.5,borderRadius:15,backgroundColor:"black"}}>
            <Text style={{color:"white"}}>M</Text>
            </View>
            <View style={{justifyContent:"center",alignItems:"center",height:heightScale(20),width:widthScale(25),borderWidth:0.5,borderRadius:15}}>
            <Text>L</Text>
            </View>
           
            </View>

         </View>
         <Text style={{marginTop:heightScale(15),marginBottom:heightScale(15),fontSize:fontScale(16),fontWeight:"500"}}>Description</Text>

         <Text >{data?.description}</Text>

        <View>
 {/* <Image style={{height:heightScale(100),width:widthScale(335),resizeMode:"stretch",marginTop:heightScale(15)}} source={require('../../assets/images/Banner2.png')}/> */}


         <Text style={{marginTop:heightScale(15),marginBottom:heightScale(15),fontSize:fontScale(16),fontWeight:"500"}}>Similar Product</Text>

        <FlatList
 ItemSeparatorComponent={<View style={{height:20,width:20}}/>}
   showsHorizontalScrollIndicator={false}
   horizontal={true}
   data={products}
   renderItem={({item}) => <Pressable 
      onPress={()=>navigation.push("details",{id:item.id})}
   style={{height:heightScale(208),width:widthScale(157)}}>
             <Image style={{height:heightScale(149),width:widthScale(141),resizeMode:'stretch',alignSelf:"center"}} source={{uri:`${item.product_images}`}}/> 
             <Text numberOfLines={1} style={{marginLeft:widthScale(7),marginTop:heightScale(8),fontSize:fontScale(14)}}>{item.name}</Text> 
             <Text  style={{marginLeft:widthScale(7),marginTop:heightScale(8),fontWeight:"800"}}>${item.cost}</Text> 

   </Pressable>}
     />
     
        </View>
      
      </ScrollView>
      <View style={{flexDirection:"row",justifyContent:"space-evenly",height:heightScale(100),position:"absolute",paddingTop:heightScale(15),top:heightScale(720),width:widthScale(375),}}>
      <View style={{ flexDirection:'row',justifyContent:"space-around",height:heightScale(45),width:widthScale(150),borderRadius:15,}}>
    <Pressable style={{height:heightScale(35),width:widthScale(35),borderWidth:0.25,borderRadius:12,justifyContent:"center",alignItems:"center"}}
    onPress={()=>{
      quantity>1?setQuantity(quantity - 1):null
    }}
    >
   
   
    <Text style={{marginTop:-2,fontSize:fontScale(30)}}>-</Text>
    

    </Pressable>
    <View style={{height:heightScale(35),width:widthScale(35),borderWidth:0.25,borderRadius:12,justifyContent:"center",alignItems:"center"}}>
    <Text>{quantity}</Text>
    </View>
    <Pressable style={{height:heightScale(35),width:widthScale(35),borderWidth:0.25,borderRadius:12,justifyContent:"center",alignItems:"center"}}
      onPress={()=>{
        quantity<8?setQuantity(quantity + 1):null
      }}
    >
    <Text style={{marginTop:-2,fontSize:fontScale(30)}}>+</Text>
    </Pressable>


      </View>
      
      <TouchableOpacity style={{height:heightScale(45),width:widthScale(180),backgroundColor:"black",borderRadius:15,justifyContent:"center",alignItems:"center"}}
      onPress={()=>addToCart()}
      >
    <Text style={{fontSize:18,color:"white",fontWeight:"600"}}>Add To Cart</Text>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}