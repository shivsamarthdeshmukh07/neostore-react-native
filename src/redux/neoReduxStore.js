import { configureStore } from "@reduxjs/toolkit";
import neoSlice from "./neoSlice";

import {
  persistStore,
  persistReducer,
} from 'redux-persist'
import EncryptedStorage from "react-native-encrypted-storage";



const persistConfig = {
  key: "root",
  storage :EncryptedStorage
};

const persistedReducer = persistReducer(persistConfig,neoSlice);

export default neoReduxStore= configureStore({

 

    reducer:{
        neoStore : persistedReducer,
       
    },
    middleware: (
      getDefaultMiddleware, // non- serilizer error
    ) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
   
})

export const persistor = persistStore(neoReduxStore);