"use client"

import { useRef, useState } from "react";

function useApiHook() {
    const abortSignalRef = useRef(null);
    const setTimeOutIDRef = useRef(null);
    const [data, setData] = useState(null);
    const searchStringRef = useRef('')

    const searchText = (string) => {
        searchStringRef.current = string
        if(setTimeOutIDRef.current){
            clearTimeout(setTimeOutIDRef.current);
        }
            const id = setTimeout(async() => {
                const abortCon = new AbortController();
                if(abortSignalRef.current){
                    console.log(
                        "Before abort:",
                        abortSignalRef.current.signal.aborted
                    );
                
                    abortSignalRef.current.abort();
                
                    console.log(
                        "After abort:",
                        abortSignalRef.current.signal.aborted
                    );
                }
               
                abortSignalRef.current = abortCon;
                const signal = abortCon?.signal
               
                setTimeOutIDRef.current = null;
                try{
                    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/10?string=${searchStringRef.current}`, {signal});
                    const responseData = await response.json();
                    setData(responseData);
                }
                catch(e){
                    console.log(e)
                }
                abortSignalRef.current  = null
                
            }, 3000);
            setTimeOutIDRef.current = id


    }

    return({data, searchText})

}

export default useApiHook
