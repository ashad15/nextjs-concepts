
"use client"
import { useEffect, useRef, useState } from "react";
import useFetchhook from "./hooks/useFetchHook";

export default function UserCards() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data, loading, err } = useFetchhook(searchQuery);

  const querString = ["ash", "404", "am"];

  const itemIndex = useRef(1);

  useEffect(() => {
    function getItems() {
      setTimeout(() => {
        setSearchQuery(querString[itemIndex?.current]);
        itemIndex.current = itemIndex.current + 1;
        getItems();
      }, 6000);
    }

    getItems();
  }, []);

  return (
    <div style={{ background: "grey" }}>
      <div
        style={{
          background: "yellow",
          height: "600px",
          width: "600px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {loading ? (
          <div style={{ padding: "20px", width: "300px", height: "300px" }}>
            {" "}
            loading ...
          </div>
        ) : err ? (
          <div style={{ padding: "20px", width: "300px", height: "300px" }}>
            {" "}
            {err.message}
          </div>
        ) : (
          <>
            {data.map((item) => (
              <div key={item} style={{ padding: "20px", width: "300px", height: "300px" }}>
                {" "}
                {item}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
