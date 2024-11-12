import { createSlice,nanoid } from '@reduxjs/toolkit'

const initialState={
    userData:{},
    address:[]
}

const neoSlice = createSlice({
    name:"neoStore",
    initialState,
    reducers:{
        addUser:(state=initialState,action)=>{
            state.userData={...action.payload}
        },
        updateUser:(state=initialState,action)=>{
            state.userData={...action.payload}
        },
        deleteUser:(state=initialState,action)=>{
            state.userData={}
        },
        addAdress:(state=initialState,action)=>{
            state.address.push({id:nanoid() ,...action.payload})
        },
        updateAddress:(state=initialState,action)=>{
            console.log("hiiiiiiiiiiiiii")
            state.address= state.address.map((add)=>add.id == action.payload.id ? {...action.payload}:add)
        },

        deleteAddress:(state=initialState,action)=>{
          
            state.address= state.address.filter((add)=>add.id != action.payload ?add:null)
           
        },

    }
})

export default neoSlice.reducer

export const {addUser,updateUser,deleteUser,addAdress,updateAddress,deleteAddress} = neoSlice.actions