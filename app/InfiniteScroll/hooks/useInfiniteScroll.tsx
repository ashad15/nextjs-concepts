"use client"

import { useEffect, useRef, useState } from 'react'
import {getConstUserData} from  '../constants/dataConst'


type dataType = {
    name : string, 
    desc : string
}


export default function useInfiniteScroll(heightOfSingleElement : number, elemnetsThatCanfit : number ){


    const updateOriginaldata = () =>{
        let copy = JSON.parse(JSON.stringify(getConstUserData))
        setData(prev => [...prev, ...copy]);
    }

    const [data, setData] = useState(getConstUserData);
    const [marginTop, setMarginTop] = useState<number>(0);
    const [dataToBeRendered, setDataToBeRendered] = useState<dataType[]>(getConstUserData);
    const dataRef = useRef<null | any[]>(null);
    dataRef.current = data;
    const debounceId = useRef(null);

    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, [])

    const onScroll = () => {
        if(debounceId?.current){
            clearTimeout(debounceId.current);
        }
        else{
            setTimeout(() => {
                getAndsetData();
            }, 100);
        }
    }


   

    const getAndsetData = () => {
        if (typeof window === "undefined") return;

        let data = dataRef?.current;
       console.log(data);
       if(data === null)return ;
        if(data.length){
           
            let offSetTop = Math.ceil(window.pageYOffset) ;
            let startingIndex = 0;
             let endindex = startingIndex + elemnetsThatCanfit;
           if(offSetTop > 0){
            let skippedlement = Math.floor(offSetTop / heightOfSingleElement) 
            if(skippedlement > 20 ){
                 startingIndex = skippedlement - 20 ;

            }
            let expectedEndIndex = skippedlement + elemnetsThatCanfit + 20
            endindex = expectedEndIndex <= data.length - 1 ? expectedEndIndex : data.length - 1
           }
           let visibleArray = data.slice(startingIndex, endindex);
           setDataToBeRendered(visibleArray);
           setMarginTop(startingIndex * heightOfSingleElement);
        }

    }  
    
    return {marginTop, dataToBeRendered, totalItems :data?.length, updateOriginaldata }


}