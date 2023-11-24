"use client";
import { StudentType } from "@/lib/interfaces/student.interface";
import React, { createContext, useState, useContext } from "react";

const SelectedChildContext = createContext<{
  selectedChild: StudentType | undefined;
  setSelectedChild: (sel: StudentType) => void;
}>({
  selectedChild: undefined,
  setSelectedChild: () => {},
});

export const SelectedChildProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedChild, setSelectedChild] = useState<StudentType | undefined>();

  return (
    <SelectedChildContext.Provider
      value={{
        selectedChild,
        setSelectedChild,
      }}
    >
      {children}
    </SelectedChildContext.Provider>
  );
};

export const useSelectedChild = () => useContext(SelectedChildContext);
