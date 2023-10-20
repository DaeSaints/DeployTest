import React from "react";

const ProgressPage = ({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) => {
  return (
    <div className="flex flex-col gap-2 pt-10">
      <div className="flex items-center justify-start w-full gap-3">
        {Array(totalPages)
          .fill([])
          .map((_, index) => {
            const COLORS = {
              finished: "bg-main-700",
              current: "bg-main-500",
              unfinished: "bg-slate-200",
            };
            const colorClass =
              page - 1 > index
                ? COLORS["finished"]
                : page - 1 === index
                ? COLORS["current"]
                : COLORS["unfinished"];
            return <div className={`w-10 h-2 rounded-full ${colorClass}`} />;
          })}
      </div>
      <span className="text-xs text-black">
        {page} of {totalPages}
      </span>
    </div>
  );
};

export default ProgressPage;
