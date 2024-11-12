import React, {useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import DateTimePicker from "react-native-modal-datetime-picker";



export default DatePicker =({getDataFromChild})=>{
    const [isVisible,setIsVisible]=useState(false);
    const todayDate= (new Date).toDateString().split(' ')
    const [showDate,setShowDate]=useState(`${todayDate[2]}-${todayDate[1]}-${todayDate[3]}`);

     
    useEffect(()=>getDataFromChild(showDate),[])
    
    console.log("datePicker") 
    const confirmDate=(date)=>{
       
        
        const tempDate=new Date(date)
        const dateSplit= tempDate.toDateString().split(' ')
       
        const dateStringFormat = `${dateSplit[2]}-${dateSplit[1]}-${dateSplit[3]}`
        
        
        setShowDate(dateStringFormat)
       console.log(dateStringFormat)
        getDataFromChild(dateStringFormat)
       
    }
    return(
        <View style={{marginTop:20,flexDirection:"row",backgroundColor:"white"}}>
        
    
             
            <TouchableOpacity onPress={()=>setIsVisible(!isVisible)}
        >
                    <Text >{showDate}</Text>
                    </TouchableOpacity>
            <DateTimePicker
            mode="date"
            isVisible={isVisible}
            onConfirm={(date)=>{confirmDate(date)
                setIsVisible(!isVisible)
            }}
            onCancel={()=>setIsVisible(!isVisible)}
            
            //To use the new iOS 14 style of datetime picker, set the display prop to inline:
            display="inline"
            
            
            />
            
            <Text style={{transform:[{rotate:'180deg'}],fontSize:15,color:"black"}}>^ </Text>

           
            </View>
           

    )
}