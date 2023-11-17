"use client"
import React, { ReactNode, createContext, useContext, useState } from 'react';


const TabContext = createContext({
    selectedTab: 'All', // You can set your default tab here
    changeTab: (tab: React.SetStateAction<string>) => {},
});

export const useTabContext = () => {
  return useContext(TabContext);
};

export const TabProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedTab, setSelectedTab] = useState('All'); // Initialize with your default tab

  const changeTab = (tab: React.SetStateAction<string>) => {
    setSelectedTab(tab);
  };

  return (
    <TabContext.Provider value={{ selectedTab, changeTab }}>
      {children}
    </TabContext.Provider>
  );
};