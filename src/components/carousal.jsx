import React ,{useRef,useState} from 'react'
import { Text, StyleSheet, View, Image} from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import globalStyles from '../assets/styles/styles';
import { heightScale, widthScale } from '../assets/constants/metric';
import Carousel from 'react-native-reanimated-carousel';
import home from '../screens/main/home';



const images = [
  require('../assets/images/c1.jpg'),
  require('../assets/images/c2.jpg'),
  require('../assets/images/c3.png'),
  require('../assets/images/c4.jpg'),
  require('../assets/images/c5.png'),
];

export default CarousalComp=()=>{

  const [currentIndex, setCurrentIndex] = useState(0);
  
    return(
      <View style={{ height:heightScale(175) }}>
      <Carousel
          width={325}
          height={175} 
          style={{borderRadius:20,}}
          autoPlay={true}
          autoPlayInterval={3000}
          data={images}
          onSnapToItem={(index)=>setCurrentIndex(index)}
          renderItem={({ item }) => (
           <Image
                  style={globalStyles.carouselImages}
                  source={item}
              />
          )}
      />

            <View style={styles.pagination}>
                {images.map((_, index) => (
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
     marginTop:130,
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
});