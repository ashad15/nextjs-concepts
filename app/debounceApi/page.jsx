"use client"

import useApiHook from "./useApiHook.jsx/useApiHook";

function apiSearch() {
  const { data, searchText } = useApiHook("");

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Text"
        onChange={(e) => {
          searchText(e.target.value);
        }}
      />
      <div style={{marginTop : '60px'}}>{data?.title}</div>
    </div>
  );
}

export default apiSearch
