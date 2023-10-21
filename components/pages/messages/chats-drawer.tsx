import React from "react";
import SingleChat from "./single-chat";

const ChatsDrawer = () => {
  return (
    <>
      {Array(8)
        .fill([])
        .map((_, index) => {
          return <SingleChat key={index} />;
        })}
    </>
  );
};

export default ChatsDrawer;