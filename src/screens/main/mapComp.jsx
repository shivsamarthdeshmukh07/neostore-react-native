import React, {useEffect, useState} from 'react';
import {
    Modal,
  PermissionsAndroid,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Circle} from 'react-native-maps';
import * as geolib from 'geolib';
import GetLocation from 'react-native-get-location';
import { heightScale, widthScale } from '../../assets/constants/metric';

// Request permission for location
const requestPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'Please allow location access',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default function MapComp() {
  const [currLoc, setCurrLoc] = useState(null);
  const [radius, setRadius] = useState(5000);
  const [modal, setModal] = useState(false);
  let radiusValue ;

  
  const [markers, setMarkrs] = useState([
    {latitude: 19.008139, longitude: 72.831267, title: 'neostore store'},
    
    {latitude: 19.010335, longitude: 72.832294, title: 'neostore gghgh'},
    {latitude: 19.009044, longitude: 72.831426},
    // 19.041970, 72.900468


    

    {latitude: 19.00933, longitude: 72.827951, title: 'neostore'},
    {latitude: 18.966000, longitude:  72.822296, title: 'neostore'},

  ]);

    const filterMarkers = markers.filter((marker) => {
      return geolib.isPointWithinRadius(
        marker,
        { latitude: 19.010335, longitude: 72.832294 },
        radius
      );
    });

    console.log('Filter:', filterMarkers.length);

  useEffect(() => {
    requestPermission();
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        setCurrLoc(location);
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  }, []);

  const region = currLoc
    ? {
        latitude: 19.010335,
        longitude: 72.832294,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }
    : {
        latitude: 19.010335,
        longitude: 72.832294,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      };

  return (
    <View style={styles.container}>
        <Pressable onPress={()=>setModal(!modal)} style={{position: "absolute", top :heightScale(60),left:widthScale(190),height:heightScale(40),width:widthScale(180),backgroundColor:"#ffffff",zIndex:1,borderRadius:10,justifyContent:"center",alignItems:"center"}}>
          <Text style={{color:"black"}}>Change Radius {radius/1000} km</Text>
        </Pressable>
        
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        onRegionChangeComplete={region =>
          console.log('Region Changed:', region)
        }>
            {/* <MapView.Circle
         center={{latitude: 19.008139, longitude: 72.831267}}
         radius={2000}
        /> */}
        {/* <Marker
            coordinate={{latitude: 19.010335,
                longitude: 72.832294,}}
            title="Your Location"
            pinColor="blue"
          /> */}

        {/* <Marker
            coordinate={{latitude: 19.009044, longitude: 72.831426,}}
            title="Your Location"
            pinColor="red"
          /> */}
          <Circle
          center={{latitude: 19.008139, longitude: 72.831267}}
            radius={radius}
            strokeWidth={1}
            fillColor={"#85c1f2"}
            // transparent={true}
            zIndex={0}
          />

        {filterMarkers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
          />
        ))}
        {/* <Marker
       
            coordinate={{longitude:19.011950, latitude:  72.832917}}
            
          /> */}
      </MapView>
      <Modal
      visible={modal}
      transparent={true}
      
      >
        <View style={{marginTop:heightScale(350),marginLeft:widthScale(65),height:heightScale(150),width:widthScale(250),backgroundColor:"black",zIndex:1,borderRadius:20,padding:10}}>
            <Text style={{color:"#ffffff",}}>Within what km of radius from your current location would you like to see our stores?</Text>
            <TextInput
              style={{backgroundColor:"#ffffff",padding:0,height:30,marginTop:5,borderRadius:10,paddingLeft:10}}
              placeholder='Enter the radius'
              placeholderTextColor={"black"}
              keyboardType="numeric"
              onChangeText={num=>radiusValue=num}

            />
            <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:15,marginHorizontal:8}}>
                <TouchableOpacity onPress={()=>{setModal(!modal),setRadius(radiusValue*1000)
                    
                }} style={{height:30,width:100,backgroundColor:"#ffffff",borderRadius:8,justifyContent:"center",alignItems:'center'}}>
                    <Text>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setModal(!modal)} style={{height:30,width:100,backgroundColor:"#ffffff",borderRadius:8,justifyContent:"center",alignItems:'center'}}>
                    <Text>Close</Text>
                </TouchableOpacity>
            </View>
            
        </View>
      </Modal>
    </View>
  );
}
