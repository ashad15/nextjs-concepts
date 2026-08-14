"use client"

import { useState } from "react";
import { ButtonComponent } from "design-system";  

export default function animationSort() {
  const [iniitalArr, setInitialArr] = useState([1, 4, 2, 6, 3]);
  const [lastSavedState, setLastSavedState] = useState(iniitalArr);
  const [setimeOutInterval, setSetTimeoutInterVal] = useState(1000);
  const [lastIndex, setlastIndex] = useState(0)
 
  const startAnimtation = () => {
    BubbleSorting(iniitalArr);


  };


  async  function BubbleSorting (unsorted : number[]) {
    for(let i = lastIndex; i < unsorted?.length; i++){
        let leftIndex= i;
        let rightIndex = i+ 1;
        if(unsorted[rightIndex] !== undefined){
            while(leftIndex >= 0 && unsorted[rightIndex] < unsorted[leftIndex]){
                console.log('aa')
                let temp = unsorted[leftIndex];
                unsorted[leftIndex] = unsorted[rightIndex];
                unsorted[rightIndex]  = temp;
                setInitialArr([...unsorted]);
                await new Promise ((res, rej) => {
                    setTimeout(() => {
                        res('he')
                    }, setimeOutInterval);
                })
                console.log('22')
                rightIndex = leftIndex;
                leftIndex = rightIndex - 1
            }
        }
    }

}

  const pauseAnimation = () => {};

  const stopAnimation = () => {};

  return (
    <div>
      <ButtonComponent/>
      <div style={{ minHeight: "500px" }}>
        <div style={{ display: "flex", gap: "32px", alignItems : 'self-end', minHeight: "500px" }}>
          {lastSavedState?.map((eachArrayItem) => (
            <div
              style={{
                height: `${eachArrayItem * 10}px`,
                background: "purple",
                width: "20px",
              }}
            />
          ))}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "row", gap: "16px" }}>
        <button onClick={startAnimtation}>Start Animation</button>
      </div>
    </div>
  );
}
