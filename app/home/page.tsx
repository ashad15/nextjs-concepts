'use client'


import {useContext, useState } from 'react';
import { HomeContext } from '@/store/context/HomeContext';


export default function  Page (){

    let [value, setValue] = useState(0);

    const context = useContext(HomeContext)
    console.log(context);

    return(
        <div onClick={() => context.setCount(10)}>
            <h1 >ashad {context?.count}</h1>
            
        </div>
    )
}

