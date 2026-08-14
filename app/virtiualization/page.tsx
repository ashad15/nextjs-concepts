"use client";

import { useEffect, useState } from "react";
import { divItems } from "./const";

function createVirtiualization() {

  if (typeof window === "undefined") {
    return <></>;
  }
  const bufferItems = 20;
  const heightofDiv = 20;
  const itemsThatCanFit = Math.ceil(window.innerHeight / heightofDiv) + 20;

  const [itemsStartIndex, seTitemsStartIndex] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const onScroll = () => {
    if (typeof window === "undefined") {
     // console.log("a");
      return;
    }
    let top_hight = window.pageYOffset;
  //  console.log(top_hight);
    let itemsNewStartIndex = Math.ceil(top_hight / heightofDiv) - bufferItems;
   // console.log(itemsNewStartIndex)
    itemsNewStartIndex = itemsNewStartIndex > 0 ? itemsNewStartIndex : 0;
    seTitemsStartIndex(itemsNewStartIndex);
  };

  const renderItems = () => {
   // console.log(itemsStartIndex, itemsStartIndex + itemsThatCanFit)
    let elementsArray: { text: string }[] = divItems.slice(
      itemsStartIndex,
    itemsThatCanFit + itemsStartIndex
    );
    //console.log(elementsArray);

    let totalHeight = divItems?.length * heightofDiv;
    let margin = itemsStartIndex * heightofDiv
    console.log(margin, elementsArray, itemsStartIndex, )
    return (
      <div  style={{ height: `${totalHeight}px`, marginTop: `${margin}px` }} className="container">
        {elementsArray.map((item, index) => (
          <div key ={index} style={{}}>{item.text}</div>
        ))}
      </div>
    );
  };

  return <div>{renderItems()}</div>;
}

export default createVirtiualization;
