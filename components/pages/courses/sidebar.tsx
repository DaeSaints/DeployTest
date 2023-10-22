import React from "react";

const CoursesSidebar = () => {
  return (
    <section className="flex flex-col w-[14rem] py-2 bg-main-700/90 drop-shadow-[0_30px_30px_rgba(0,0,0,0.25)] border-l border-slate-300">
      <header className="flex items-center justify-between w-full h-24 px-6 pt-4 pb-6">
        <h1 className="text-2xl font-medium text-white">Courses Manager</h1>
        {/* <Button
          variant={"ghost"}
          className="w-6 h-6 p-1 text-white rounded-full"
          onClick={() => {
            router.push("/messages/new");
          }}
        >
          <PenBox className="w-full h-full" />
        </Button> */}
      </header>
    </section>
  );
};

export default CoursesSidebar;
