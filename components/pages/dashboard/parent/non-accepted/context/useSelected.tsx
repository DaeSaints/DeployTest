"use client";
import { StudentType } from "@/lib/interfaces/student.interface";
import React, { createContext, useState, useContext, ReactNode } from "react";

type ClassesType = any; // replace with your actual type

const SelectedContext = createContext<{
  selected: ClassesType[];
  addSelected: (sel: ClassesType) => void;
  moveUp: (index: number) => void;
  moveDown: (index: number) => void;
  remove: (index: number) => void;
  clear: () => void;
}>({
  selected: [],
  addSelected: () => {},
  moveUp: () => {},
  moveDown: () => {},
  remove: () => {},
  clear: () => {},
});

export const SelectedProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selected, setSelected] = useState<ClassesType[]>([]);

  const addSelected = (sel: ClassesType) => {
    setSelected((prev) => [...prev, sel]);
  };

  const moveUp = (index: number) => {
    const newSelected = [...selected];
    if (index > 0) {
      const temp = newSelected[index];
      newSelected[index] = newSelected[index - 1];
      newSelected[index - 1] = temp;
      setSelected(newSelected);
    }
  };

  const moveDown = (index: number) => {
    const newSelected = [...selected];
    if (index < newSelected.length - 1) {
      const temp = newSelected[index];
      newSelected[index] = newSelected[index + 1];
      newSelected[index + 1] = temp;
      setSelected(newSelected);
    }
  };

  const remove = (index: number) => {
    const newSelected = [...selected];
    if (index >= 0 && index < newSelected.length) {
      newSelected.splice(index, 1);
      setSelected(newSelected);
    }
  };

  const clear = () => {
    setSelected([]);
  };

  return (
    <SelectedContext.Provider
      value={{
        selected,
        addSelected,
        moveUp,
        moveDown,
        remove,
        clear,
      }}
    >
      {children}
    </SelectedContext.Provider>
  );
};

export const useSelected = () => useContext(SelectedContext);
