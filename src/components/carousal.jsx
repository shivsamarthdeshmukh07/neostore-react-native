import React ,{useRef,useState} from 'react'
import { Text, StyleSheet, View, Image} from 'react-native';
import { heightScale, widthScale } from '../assets/constants/metric';
import Carousel from 'react-native-reanimated-carousel';
import home from '../screens/main/home';



// const images = [
//   require('../assets/images/carousel/c1.jpg'),
//   require('../assets/images/carousel/c2.jpg'),
//   require('../assets/images/carousel/c3.png'),
//   require('../assets/images/carousel/c4.jpg'),
//   require('../assets/images/carousel/c5.png'),
// ];

export default CarousalComp=({images,carouselheight,paginationheight,detail})=>{

  const [currentIndex, setCurrentIndex] = useState(0);
  
    return(
      <View style={{ height:heightScale(carouselheight), }}>
      <Carousel
          width={widthScale(312)}
          height={carouselheight} 
          style={{borderRadius:20,}}
          autoPlay={false}
          autoPlayInterval={3000}
          data={images}
          onSnapToItem={(index)=>setCurrentIndex(index)}
          renderItem={({ item }) => (
           <Image
                  style={[styles.carouselImages,{height:carouselheight}]}
                  source={item}
              />
          )}
      />

            <View style={[styles.pagination,{marginTop:paginationheight}]}>
                {images?.map((_, index) => (
                    <View
                        key={index}
                        style={[styles.dot,currentIndex === index ? styles.activeDot : styles.inactiveDot, ]}
                    />
                ))}
            </View>
  </View>
    )
}



const styles = StyleSheet.create({
  pagination: {
      position: 'absolute',
     marginLeft:130,
     
      transform: [{ translateX: -15 }], // Center dots
      flexDirection: 'row',
  },
  dot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      margin: 4,
  },
  activeDot: {
      backgroundColor: 'white', // Change to your preferred color
  },
  inactiveDot: {
      backgroundColor: 'gray', // Change to your preferred color
  },
  carouselImages: {
    width: '100%',
   
    borderRadius:20,
  
  
  overflow:'hidden',
    resizeMode: 'stretch', 
  },
});