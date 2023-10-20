"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import PageOne from "./components/page-one";
import PageTwo from "./components/page-two";
import PageThree from "./components/page-three";

const OnboardingComponent = () => {
  const totalPages = 3;
  const [page, setPage] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );

  function handlerPageOne() {}
  function handlerPageTwo() {}
  function handlerPageThree(img: string | undefined) {
    setSelectedImage(img);
  }
  function handlerFinish() {
    console.log("finish");
  }
  return (
    <>
      {page === 1 && <PageOne page={page} totalPages={totalPages} />}
      {page === 2 && <PageTwo page={page} totalPages={totalPages} />}
      {page === 3 && (
        <PageThree
          page={page}
          totalPages={totalPages}
          selectedImageOrig={selectedImage}
          handlerPageThree={handlerPageThree}
        />
      )}
      <div className="flex items-center justify-start w-full gap-2">
        {page > 1 ? (
          <Button
            size={"lg"}
            type="button"
            variant={"outline"}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Back
          </Button>
        ) : null}
        {totalPages === page ? (
          <Button size={"lg"} type="button" onClick={handlerFinish}>
            Finish
          </Button>
        ) : (
          <Button
            size={"lg"}
            type="button"
            onClick={() => setPage((prev) => prev + 1)}
          >
            Continue
          </Button>
        )}
      </div>
    </>
  );
};

export default OnboardingComponent;
