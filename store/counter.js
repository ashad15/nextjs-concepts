import { createSlice } from "@reduxjs/toolkit";



const counterSlice = createSlice({
    name : 'newcounter',
    initialState: {
        count : 2,
    } ,

    reducers: {
        increment(state){
            state.count + 1
        },
        decrement : () => {
            state.count - 1
        }
    } 

})

export const {increment, decrement} = counterSlice.actions;
export default counterSlice.reducer;