import React, { memo, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import styles from "../assets/styles/styles";
import globalStyles from "../assets/styles/styles";
import EyeIcon from 'react-native-vector-icons/Feather';
import { heightScale, widthScale } from "../assets/constants/metric";

const InputField = memo(({ placeHolder, icon, getDataFromChild, value }) => {
    const [visible, setVisible] = useState(false);
    const [isFocus, setFocus] = useState(false);

    const eyeIcon = <EyeIcon name={visible ? "eye" : "eye-off"} size={25} color="gray" />;
         // console.log("hiiiiii ")
    return (
        <View style={{marginBottom: heightScale(10),paddingTop: heightScale(18),width:placeHolder==="First_name"||placeHolder==="Last_name"? widthScale(140):widthScale(312),borderBottomWidth: 1, borderColor: "#D6D6D6",  }}>
            {isFocus && <Text>{placeHolder}</Text>}

               <View style={{ flexDirection: "row" }}>
                <TextInput
                    value={value}
                    style={[globalStyles.authTextInpunt,{width:placeHolder==="First_name"||placeHolder==="Last_name"?100:"92%"}]}
                    placeholder={isFocus ? "" : placeHolder}
                    secureTextEntry={visible} 
                    placeholderTextColor={"#343536"}

                    onFocus={() => setFocus(true)}
                    onBlur={() => {
                       // console.log("k",value)
                        setFocus(false);
                    }}

                     onChangeText={getDataFromChild} 
                />
                <Pressable onPress={() => setVisible(!visible)}>
                    {icon && eyeIcon}
                </Pressable>
              </View>
              </View>
    );
});

export default InputField;
