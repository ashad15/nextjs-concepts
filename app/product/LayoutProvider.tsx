"use client"
import { createSlice, configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"



const headinSlice = createSlice({
    name: 'ashad',
    initialState : {someHeading : 'ashad'},
    reducers : {
        updateHeading : (state) =>{
            state.someHeading = 'newHeading'
        }
    }
})


const store = configureStore({
    reducer : {
        heading : headinSlice.reducer
    }
})

export type headingStateType = ReturnType<typeof store.getState>


export function LayoutProvider ({children}:{children: React.ReactNode}){

    return <Provider store = {store}>{children}</Provider>
}