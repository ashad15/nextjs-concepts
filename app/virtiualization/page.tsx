"use client";

import { useEffect, useState } from "react";
import { divItems } from "./const";

function Virtiualization() {
  const bufferItems = 20;
  const heightofDiv = 20;
  const itemsThatCanFit = typeof window !== "undefined"
    ? Math.ceil(window.innerHeight / heightofDiv) + 20
    : 40;

  const [itemsStartIndex, seTitemsStartIndex] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (typeof window === "undefined") {
        return;
      }
      const top_hight = window.pageYOffset;
      let itemsNewStartIndex = Math.ceil(top_hight / heightofDiv) - bufferItems;
      itemsNewStartIndex = itemsNewStartIndex > 0 ? itemsNewStartIndex : 0;
      seTitemsStartIndex(itemsNewStartIndex);
    };

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [bufferItems, heightofDiv]);

  const elementsArray: { text: string }[] = divItems.slice(
    itemsStartIndex,
    itemsThatCanFit + itemsStartIndex
  );

  const totalHeight = divItems?.length * heightofDiv;
  const margin = itemsStartIndex * heightofDiv;

  return (
    <div>
      <div style={{ height: `${totalHeight}px`, marginTop: `${margin}px` }} className="container">
        {elementsArray.map((item, index) => (
          <div key={index} style={{}}>{item.text}</div>
        ))}
      </div>
    </div>
  );
}

export default Virtiualization;
