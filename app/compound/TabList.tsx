"use client";

import React, { createContext, useContext, useState } from "react";

type TabContextType = {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
};

type TabContextFinal = TabContextType | null;

const TabsContext = createContext(null as TabContextFinal);

type TabsProps = {
  children: React.ReactNode;
  defaultTab: string;
};

const List = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

const Tab = ({ children, id }: { children: React.ReactNode; id: string }) => {
   const data  = useContext(TabsContext);
   if (!data) {
      throw new Error("Tab must be used inside <Tabs>");
    }
  return <div>{children } selected = {`${data.activeTab === id ? 'true': 'false'}`}</div>;
};

const Panel = ({ children, id }: { children: React.ReactNode; id: string }) => {
  return <div>{children}</div>;
};

type TabsComponent = React.FC<TabsProps> & {
  List: typeof List;
  Tab: typeof Tab;
  Panel: typeof Panel;
};

const TabsTemp: TabsComponent = ({ children, defaultTab }) => {
   const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div>
      <TabsContext.Provider value={{ activeTab, setActiveTab }}>
        {children}
      </TabsContext.Provider>
    </div>
  );
};

TabsTemp.Tab = Tab;
TabsTemp.List = List;
TabsTemp.Panel = Panel;



const Tabs2: TabsComponent = Object.assign(function ({children, defaultTab }: {children : React.ReactNode, defaultTab : string}){
   const [activeTab, setActiveTab] = useState(defaultTab);
   return (
      <div>
        <TabsContext.Provider value={{ activeTab, setActiveTab }}>
          {children}
        </TabsContext.Provider>
      </div>
    );
}, {Tab, List, Panel})

const Tabs = Tabs2


export default Tabs;
