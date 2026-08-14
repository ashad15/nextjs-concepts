"use client"





const { useRef, useState } = require("react");





function useApiHook(initialSearchTerm = ''){

    const searchData = useState();
    const abortSignalRef = useRef();
    const setTimeOutID = useRef(null);
    const [data, setData] = useState(null);
    const searchString = useRef('')

    const searchText = (string) => {
        searchString.current = string
        //console.log(string, setTimeOutID)
        if(setTimeOutID?.current){
            clearTimeout(setTimeOutID?.current);
        }
            const id = setTimeout(async() => {
                const abortCon = new AbortController();
               // console.log('aa', abortSignalRef)
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
               
                setTimeOutID.current = null;
                try{
                    let data = await fetch(`https://jsonplaceholder.typicode.com/todos/10?string=${searchString?.current}`, {signal});
                    setData(data);
                }
                catch(e){
                    console.log(e)
                }
                abortSignalRef.current  = null
                
            }, 3000);
            setTimeOutID.current = id


    }

    return({data, searchText})

}

export default useApiHook