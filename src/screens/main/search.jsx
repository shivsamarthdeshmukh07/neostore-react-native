import react, { useEffect, useState } from 'react'
import { Image, Pressable, SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native'

import Icon3 from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { fontScale, heightScale, widthScale } from '../../assets/constants/metric';
import Svg from 'react-native-svg';


const back = <Icon3 name={'chevron-back'} size={25} />;
const searchIcon = <Icon3 name={'search'} size={25} color={"gray"} />;
const filterIcon = <Icon3 name={'filter'} size={25} color={"gray"} />;


const notification = <Icon3 name={'notifications-outline'} size={25} />;


export default Search=({navigation})=>{
    const [input,setInput]=useState();
    

    const [data , setData]= useState([])
    //  console.log("hiiiiiiiiiiiiiiii",data)

     if(input===""){
        setInput(undefined)
     }

       const foundProduct = data.filter(product=>input === (product.name).substring(0, input?.length))

    const fetchData = async () => {
     try{

        const res1=  await axios({
            method: 'GET',
            url: `http://staging.php-dev.in:8844/trainingapp/api/products/getList?product_category_id=1`,
            headers: {
              'Content-Type': 'application/json',
            },
          })
          const res2=  await axios({
              method: 'GET',
              url: `http://staging.php-dev.in:8844/trainingapp/api/products/getList?product_category_id=2`,
              headers: {
                'Content-Type': 'application/json',
              },
            })
            const res3=  await axios({
              method: 'GET',
              url: `http://staging.php-dev.in:8844/trainingapp/api/products/getList?product_category_id=3`,
              headers: {
                'Content-Type': 'application/json',
              },
            })
            const res4=  await axios({
              method: 'GET',
              url: `http://staging.php-dev.in:8844/trainingapp/api/products/getList?product_category_id=4`,
              headers: {
                'Content-Type': 'application/json',
              },
            })
                //   console.log("res1",res1?.data?.data)
                //   console.log("res2",res2?.data?.data)

                //   console.log("res3",res3?.data?.data)
                //   console.log("res4",res4?.data?.data)

              setData([...res1?.data?.data,...res2?.data?.data,...res3?.data?.data,...res4?.data?.data])
  
     }catch(e){
       console.log(e)
     }
        
        //   .then(res =>{ getData(res.data.data)
        //    console.log("kkkkk",res.data.data)
           
        //   })
        //   .then((res)=>fetch2(res))
        //   .then((res2)=>fetch3(res2))
        //   .then((res2)=>fetch3(res2))


        //   .catch(e => console.log('error@@', e));
      }


      useEffect(()=>{fetchData()
      },[])
    
return(
    <SafeAreaView style={{marginHorizontal: widthScale(33)}}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
          <Pressable onPress={() => navigation.navigate('home')}>
            {back}
          </Pressable>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Discover</Text>
          {notification}
        </View>

<View style={{flexDirection:"row",alignItems:"center",marginTop:heightScale(25),marginBottom:heightScale(20)}}>
    {searchIcon}
    <TextInput 
style={{marginLeft:widthScale(5),marginRight:widthScale(5),height:heightScale(40),width:widthScale(240)}}
   placeholder='search'
   onChangeText={(text)=>{
    setInput(text)
   
   }}
   />
   {filterIcon}
</View>
<View style={{flexDirection:"row",flexWrap:"wrap",}}>
{foundProduct.length?foundProduct.map(product=>{ return( <Pressable 
      onPress={()=>navigation.navigate("details",{id:product.id})}
   style={{height:heightScale(208),width:widthScale(154.5)}}>
             <Image style={{height:heightScale(149),width:widthScale(141),resizeMode:'stretch',alignSelf:"center"}} source={{uri:`${product.product_images}`}}/> 
             <Text numberOfLines={1} style={{marginLeft:widthScale(7),marginTop:heightScale(8),fontSize:fontScale(14)}}>{product.name}</Text> 
             <Text  style={{marginLeft:widthScale(7),marginTop:heightScale(8),fontWeight:"800"}}>${product.cost}</Text> 

   </Pressable>)})
   
:<View style={{height:50}}/>}
</View>

<Pressable style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",paddingHorizontal:widthScale(25),paddingLeft:widthScale(40),height:heightScale(100),width:widthScale(311),backgroundColor:"#A3A798",borderRadius:25,marginBottom:heightScale(15)}}
onPress={()=>navigation.navigate("gallery",{productId:1})}
>
    <Text style={{color:"white",fontSize:fontScale(24)}}>Tables</Text>
    <Image style={{height:80,width:80}} source={require('../../assets/images/table2.jpg')}/>
</Pressable>
<Pressable style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",paddingHorizontal:widthScale(25),paddingLeft:widthScale(40),paddingHorizontal:widthScale(20),height:heightScale(100),width:widthScale(311),backgroundColor:"#898280",borderRadius:25,marginBottom:heightScale(15)}}
onPress={()=>navigation.navigate("gallery",{productId:2})}
>
<Text style={{color:"white",fontSize:fontScale(24)}}>Chairs</Text>

<Image style={{height:80,width:80}} source={require('../../assets/images/chair.jpg')}/>

</Pressable>
<Pressable style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",paddingHorizontal:widthScale(25),paddingHorizontal:widthScale(20),height:heightScale(100),width:widthScale(311),backgroundColor:"#44565C",borderRadius:25,marginBottom:heightScale(15)}}
onPress={()=>navigation.navigate("gallery",{productId:3})}
>
<Text style={{color:"white",fontSize:fontScale(24)}}>Sofas</Text>


<Image style={{height:100,width:100,borderRadius:10}} source={require('../../assets/images/sofa.jpg')}/>

</Pressable>
<Pressable style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",paddingHorizontal:widthScale(25),paddingHorizontal:widthScale(20),height:heightScale(100),width:widthScale(311),backgroundColor:"#9E7C71",borderRadius:25,marginBottom:heightScale(15)}}
onPress={()=>navigation.navigate("gallery",{productId:4})}
>
<Text style={{color:"white",fontSize:fontScale(24)}}>Beds</Text>

<Image style={{height:80,width:80}} source={require('../../assets/images/bed2.jpg')}/>

</Pressable>


</ScrollView>

    </SafeAreaView>
)

}