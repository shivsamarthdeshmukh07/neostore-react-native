
import React from "react";
import { View } from "react-native";
import Routes from "./src/routes/routes";
import { Provider } from "react-redux";
import neoReduxStore, { persistor } from "./src/redux/neoReduxStore";
import { PersistGate } from "redux-persist/integration/react";


const App = () =>{
   return(

<Provider store={neoReduxStore} >
   <PersistGate loading={null} persistor={persistor}>
    <Routes/>
    </PersistGate>
    </Provider>
    
   )
}

export default App;