
import React from "react";
import { StatusBar, View } from "react-native";
import Routes from "./src/routes/routes";
import { Provider } from "react-redux";
import neoReduxStore, { persistor } from "./src/redux/neoReduxStore";
import { PersistGate } from "redux-persist/integration/react";
import { LogBox } from 'react-native';
import FlashMessage from "react-native-flash-message";
import { heightScale, widthScale } from "./src/assets/constants/metric";
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

const App = () =>{
   return(

<Provider store={neoReduxStore} >
   <PersistGate loading={null} persistor={persistor}>
    <Routes/>
    </PersistGate>
    <StatusBar
    backgroundColor={"white"}
    barStyle={"dark-content"}
    >

    </StatusBar>
    <FlashMessage position={"bottom"} 
    style={{
      marginHorizontal: widthScale(35),
      width: widthScale(300),
      bottom: 100,
      backgroundColor: "white",
      borderWidth:1,
      borderRadius:20,
      height:heightScale(100),
      paddingTop: heightScale(30),
     
    }}
    titleStyle={{
      fontSize: 16, // Adjust text size if needed
      color: "black",
    }}
    textStyle={{
      fontSize: 14,
      color: "black"
    }}
    
    />
    </Provider>
    
   )
}

export default App;