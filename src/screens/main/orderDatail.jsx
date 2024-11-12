import React, { useEffect, useState } from "react";
import { Image, Modal, Pressable, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import OrderItem from '../../components/orderItem'
import Icon3 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Feather';
import { fontScale, heightScale, widthScale } from '../../assets/constants/metric';
import axios from 'axios';
import { useSelector } from 'react-redux';
import StarRating from 'react-native-star-rating-widget';
import { showMessage, hideMessage } from "react-native-flash-message";




const back = <Icon3 name={'chevron-back'} size={25} />;
const wishlistIcon = <Icon name={'heart'} size={25} />;
const bag =<Icon2 name={"shopping-bag"} size={25} />

export default OrderDetail=({route,navigation})=>{
       console.log("hqwwe",route.params)
    const [data,setData]=useState([])
    const [star,setStar]=useState(0)
    const [modal,setModal]=useState(false)
    const [productId, setProductId]=useState();


    const submit = async(productId)=>{
        try {
            const formData = new FormData();
      formData.append('product_id',productId );
      formData.append('rating', star);
            const result = await axios.post(
              'http://staging.php-dev.in:8844/trainingapp/api/products/setRating',
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  access_token: userData.user_data.access_token,
                },
              }
            )
            .then(res=>console.log(res.data.status))
        
            // console.log('Response Data:', result.data);
          } catch (error) {
            console.error('Error occurred:', error);
          }
    }


    const getCartItems = async () => {
        await axios({
          method: 'GET',
          url: `http://staging.php-dev.in:8844/trainingapp/api/orderDetail?order_id=${route.params.orderId}`,
          
          headers: {
            'Content-Type': 'application/json',
            access_token:userData.user_data.access_token
          },
        })
          .then(res =>{setData(res.data)
          
          })
          .catch(e => console.log('get data error',data.data.access_token));
      }
      
    // console.log("arr",data?.data?.order_details)
    console.log("arr",star)

   
      useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
           getCartItems()
        });
        return unsubscribe;
      }, [navigation]);

    const userData = useSelector(state => state.neoStore.userData)
    return(
        <SafeAreaView>
        <View style={{flexDirection: 'row', justifyContent: 'space-between',marginHorizontal: widthScale(33),marginBottom:heightScale(5)}}>
          <Pressable onPress={() => navigation.goBack('home')}>
            {back}
          </Pressable>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Order Details</Text>
          {wishlistIcon}
        </View>

        <View style={{width:widthScale(309),borderRadius:20,height:heightScale(115),marginBottom:heightScale(25),borderWidth:0.3,marginHorizontal:widthScale(34),marginTop:heightScale(40)}}>

            <View style={{flexDirection:"row"}}>
                <View style={{width:widthScale(80),height:heightScale(115),justifyContent:"center",alignItems:"center",}}>
                    {bag}
                </View>
              <View>
                  
              <View style={{flexDirection:"row"}}>
          <Text style={{marginTop:heightScale(20),marginBottom:heightScale(10),fontSize:fontScale(16),fontWeight:"bold",paddingHorizontal:widthScale(10)}}>Order No.</Text>
          <Text style={{marginTop:heightScale(20),marginBottom:heightScale(10),fontSize:fontScale(16),fontWeight:"bold"}}>{data?.data?.id}</Text>
                </View>
                <View style={{flexDirection:"row" }}>
          <Text style={{marginBottom:heightScale(10),fontSize:fontScale(16),fontWeight:"400",paddingLeft:widthScale(10)}}>Date. </Text>
          <Text style={{marginBottom:heightScale(10),fontSize:fontScale(16),fontWeight:"400"}}>{route.params.orderDate}</Text>
            </View>
            <View style={{flexDirection:"row" }}>
          <Text style={{marginBottom:heightScale(10),fontSize:fontScale(16),fontWeight:"400",paddingLeft:widthScale(10)}}>total cost : </Text>
          <Text style={{marginBottom:heightScale(10),fontSize:fontScale(16),fontWeight:"400"}}>{data?.data?.cost}</Text>
            </View>  
                </View>  
            </View>
        </View>

          <View style={{flexDirection:"row",marginHorizontal:widthScale(33),}}>
        <Text style={{marginTop:heightScale(20),marginBottom:heightScale(10),fontSize:fontScale(16),fontWeight:"bold"}}>Delivery Address : </Text>
        <Text style={{marginBottom:heightScale(10),marginTop:heightScale(20),fontSize:fontScale(16),fontWeight:"400",width:widthScale(170)}}>{data?.data?.address}</Text>

          </View>

        <Text style={{marginHorizontal:widthScale(33),marginTop:heightScale(20),marginBottom:heightScale(10),fontSize:fontScale(16),fontWeight:"bold"}}>Cart Summery : </Text>
         {data?.data?.order_details.map((item)=>(
            <View style={{marginHorizontal:widthScale(33),flexDirection:"row",width:widthScale(310),height:heightScale(99),marginTop:heightScale(30)}}>
               <Image style={{height:heightScale(97),width:widthScale(99),resizeMode:"stretch"}}
                 source={{uri:`${data?.data?.order_details[0]?.prod_image}`}}
               />
               <View>
          <Text style={{marginLeft:widthScale(10),marginTop:heightScale(10),marginBottom:heightScale(5),fontSize:fontScale(16),fontWeight:"bold"}}>gfhh</Text>
<View style={{flexDirection:"row"}}>
<View style={{flexDirection:"row"}}>
<Text style={{marginLeft:widthScale(10),marginBottom:heightScale(5),fontSize:fontScale(16),fontWeight:"400"}}>Qty : {item.id}</Text>
    
    </View>    

    <View style={{flexDirection:"row"}}>
<Text style={{marginLeft:widthScale(10),marginBottom:heightScale(5),fontSize:fontScale(16),fontWeight:"400"}}>Total : {item.total} </Text>
{/* <Text style={{marginBottom:heightScale(5),fontSize:fontScale(16),fontWeight:"400"}}>jhghfh</Text> */}
    
    </View> 
    </View>   
    <View style={{flexDirection:"row" ,marginLeft:widthScale(10)}}>
    <TouchableOpacity style={{height:heightScale(32),width:widthScale(90),backgroundColor:"black",borderRadius:15,justifyContent:"center",alignItems:"center",marginRight:widthScale(10)}}
      onPress={()=>{
          setProductId(item.product_id)
        setModal(!modal)}
      }
      >
    <Text style={{fontSize:16,color:"white",fontWeight:"600"}}>Rate</Text>
      </TouchableOpacity>
     <TouchableOpacity style={{height:heightScale(32),width:widthScale(90),backgroundColor:"black",borderRadius:15,justifyContent:"center",alignItems:"center",marginRight:widthScale(10)}}
     
      
      onPress={()=>navigation.navigate("details",{id:item.product_id})}
       
      
      >
    <Text style={{fontSize:16,color:"white",fontWeight:"600"}}>Buy Again</Text>
      </TouchableOpacity>
    </View>         
                </View>              

               </View>
         ))}

         <Modal
         transparent={true}
         visible={modal}
         >
            <View style={{width:widthScale(300),height:heightScale(150),backgroundColor:'white',alignSelf:"center",top:heightScale(350),padding:heightScale(5),borderRadius:20,borderWidth:1}}>
            <Text style={{marginTop:heightScale(20),marginBottom:heightScale(10),fontSize:fontScale(16),fontWeight:"bold",alignSelf:"center"}}>How would you rate it?</Text>

               <StarRating
        starSize={35}
        rating={star}
        color="black"
        starStyle={{marginHorizontal:10,paddingLeft:4}}
        onChange={(number)=>{setStar(number)}}
        />
        <View style={{flexDirection:"row" ,justifyContent:"space-evenly",marginTop:heightScale(20)}}>
    <TouchableOpacity style={{height:heightScale(32),width:widthScale(90),backgroundColor:"black",borderRadius:15,justifyContent:"center",alignItems:"center",marginRight:widthScale(10)}}
      onPress={()=>{setModal(!modal)
        setStar(0)}
      }
      >
    <Text style={{fontSize:16,color:"white",fontWeight:"600"}}>Close</Text>
      </TouchableOpacity>
     <TouchableOpacity style={{height:heightScale(32),width:widthScale(90),backgroundColor:"black",borderRadius:15,justifyContent:"center",alignItems:"center",marginRight:widthScale(10)}}
     
      
      onPress={()=>{submit(productId)
        setModal(!modal)
        showMessage({
            
            message: "Rating submitted",
            description: "Thanks for your rating",
            type: "success",
          });
      }}
       
      
      >
    <Text style={{fontSize:16,color:"white",fontWeight:"600"}}>Submit</Text>
      </TouchableOpacity>
    </View> 
            </View>


         </Modal>
        
        </SafeAreaView>
    )
}