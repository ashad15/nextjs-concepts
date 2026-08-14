"use client"

import { useEffect, useRef } from "react";
import useInfiniteScroll from "./hooks/useInfiniteScroll";


function InfiniteScroll(){

    const heightOfSingleElement = 40;
    const elemnetsThatCanfit = window.innerHeight / 40;
    const lastTenthValueobserver = useRef(null);
    const valueObserver = new MutationObserver(() => {});



    const {  marginTop, dataToBeRendered, totalItems, updateOriginaldata } = useInfiniteScroll (heightOfSingleElement, elemnetsThatCanfit);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if(entry.isIntersecting){
                console.log('aaaa')
                updateOriginaldata();
            }
        });
    
        if (lastTenthValueobserver.current) {
            observer.observe(lastTenthValueobserver.current);
        }
    
        return () => observer.disconnect();
    }, []);


    return(
        <>
        <h2>hey there</h2>
        <div style={{paddingTop : `${marginTop}px`, height : `${totalItems * 40}px`, boxSizing : 'border-box'}}>
            {dataToBeRendered.map((data, index) => {
                return(<div ref={index === (dataToBeRendered.length - 11) ?lastTenthValueobserver : null }>
                    <h1>{data.name}</h1>
                    <p>{data.desc}</p>
                </div>)
            })}
        </div>
        </>
    )



}

export default InfiniteScroll