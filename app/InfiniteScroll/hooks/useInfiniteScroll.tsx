"use client"

import { useEffect, useRef, useState } from 'react'
import {getConstUserData} from  '../constants/dataConst'


type dataType = {
    name : string, 
    desc : string
}


export default function useInfiniteScroll(heightOfSingleElement : number, elemnetsThatCanfit : number ){


    const updateOriginaldata = () =>{
        const copy = JSON.parse(JSON.stringify(getConstUserData))
        setData(prev => [...prev, ...copy]);
    }

    const [data, setData] = useState(getConstUserData);
    const [marginTop, setMarginTop] = useState<number>(0);
    const [dataToBeRendered, setDataToBeRendered] = useState<dataType[]>(getConstUserData);
    const dataRef = useRef<dataType[]>(getConstUserData);
    const debounceId = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        dataRef.current = data;
    }, [data]);

    useEffect(() => {
        const getAndsetData = () => {
            if (typeof window === "undefined") return;

            const currentData = dataRef.current;
            if(!currentData.length) return;

            const offSetTop = Math.ceil(window.pageYOffset);
            let startingIndex = 0;
            let endindex = startingIndex + elemnetsThatCanfit;
            if(offSetTop > 0){
                const skippedlement = Math.floor(offSetTop / heightOfSingleElement);
                if(skippedlement > 20 ){
                    startingIndex = skippedlement - 20;
                }
                const expectedEndIndex = skippedlement + elemnetsThatCanfit + 20;
                endindex = expectedEndIndex <= currentData.length - 1 ? expectedEndIndex : currentData.length - 1;
            }
            const visibleArray = currentData.slice(startingIndex, endindex);
            setDataToBeRendered(visibleArray);
            setMarginTop(startingIndex * heightOfSingleElement);
        };

        const onScroll = () => {
            if(debounceId.current){
                clearTimeout(debounceId.current);
            }
            debounceId.current = setTimeout(() => {
                getAndsetData();
            }, 100);
        };

        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, [heightOfSingleElement, elemnetsThatCanfit]);
    
    return {marginTop, dataToBeRendered, totalItems :data?.length, updateOriginaldata }


}
