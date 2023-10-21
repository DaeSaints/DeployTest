import Image from "next/image";
import React from "react";

const SingleMessage = ({
  side,
  image,
  date,
  content,
  today,
}: {
  side: "Me" | "Other";
  image?: string;
  date: Date;
  today: Date;
  content: string;
}) => {
  const formattedDate =
    date.toDateString() === today.toDateString()
      ? date.toLocaleString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : date
          .toLocaleString("en-US", {
            day: "numeric",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
          })
          .replace(/\s/g, " ");

  return (
    <div
      className={`items-start gap-2 justify-start w-full ${
        side === "Other" ? "pr-16 flex" : "pl-16 flex flex-row-reverse"
      } h-fit`}
    >
      <div className="flex flex-col items-center justify-start w-16 h-full gap-2 pt-4">
        <div className="relative w-8 h-8 overflow-hidden bg-black rounded-full">
          {image && <Image src={image} alt="Pic" fill />}
        </div>
        <span className={`text-xs text-center`}>{formattedDate}</span>
      </div>

      <div
        className={`flex flex-1 ${
          side === "Other" ? "pr-16 flex" : "pl-16 flex flex-row-reverse"
        }`}
      >
        <div className="max-w-full pl-2">
          <p
            className={`p-2 rounded-md text-sm ${
              side === "Other" ? "bg-main-300" : "bg-slate-300"
            }`}
          >
            {content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleMessage;
