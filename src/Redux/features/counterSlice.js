import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    
    value:1,
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers:{
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) =>{
            if (state.value != 1) {
                state.value -=1
            } 
        },
        noChange: (state) => {
            state.value = state.value
        },
        reset: (state,action) =>{
            state.value = action.payload
        }

    }
})

export const {increment,decrement , noChange, reset} = counterSlice.actions
export default counterSlice.reducer