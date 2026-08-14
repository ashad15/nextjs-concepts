"use client"

import React, {useRef} from 'react'

const Uncontrolled = () => {

    const divref = useRef<HTMLDivElement | null>(null)
  
    let count = 1;

    

    const onOuteClick = () => {
        if (divref.current !== null) {
            divref.current.innerHTML = "this is changed";
          }
    }
    return (<div onClick = {onOuteClick}  >
        <div    ref={divref }>
        {count}
        </div>
    </div>)
}

export default Uncontrolled