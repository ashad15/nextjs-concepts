"use client";

import { createContext, useState, type ReactNode } from "react";

export const HomeContext = createContext({
    count: 0,
    setCount: (val: number) => {},
})






export function HomeProvider({ children }: { children: ReactNode }) {

    const [count, setCount] = useState(0)


  return (
    <HomeContext.Provider value={{count, setCount}}>
      {children}
    </HomeContext.Provider>
  );
}
