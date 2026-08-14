"use client"

import React, { useState } from "react";



function Controlled (){
    const [counter, setIncreaseCounter] = useState(0);

    const increaseCounter = () => {
        setIncreaseCounter((prev) => prev+1)
    }

    return(
        <div onClick ={increaseCounter}>
            counter is {counter}
        </div>
    )

}


export default Controlled