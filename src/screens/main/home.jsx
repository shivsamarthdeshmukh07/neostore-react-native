import React from "react";
import { Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

export default Home = () => {
    return(
        <View style={{ flex: 1 }}>
        <Carousel
            loop
            width={300}
            height={300 / 2}
            autoPlay={true}
            data={[...new Array(6).keys()]}
            scrollAnimationDuration={3000}
            onSnapToItem={(index) => console.log('current index:', index)}
            renderItem={({ index }) => (
                <View
                    style={{
                        flex: 1,
                        borderWidth: 1,
                        justifyContent: 'center',
                    }}
                >
                    <Text style={{ textAlign: 'center', fontSize: 30 }}>
                        {index}
                    </Text>
                </View>
            )}
        />
    </View>

    )}