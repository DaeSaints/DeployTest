"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import PageOne from "./components/page-one";
import PageTwo from "./components/page-two";
import PageThree from "./components/page-three";
import { addProfilePicture } from "@/lib/actions/user.action";

const OnboardingComponent = () => {
  const totalPages = 3;
  const [page, setPage] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );
  const [profileURL, setProfileURL] = useState<string>("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);
  const [userName, setUserName] = useState("");

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setPasswordValid(newPassword.length >= 8);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newConfirmPassword = event.target.value;
    setConfirmPassword(newConfirmPassword);
    setConfirmPasswordValid(newConfirmPassword.length >= 8);
    setPasswordsMatch(newConfirmPassword === password);
  };

  const handlerNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  function handlerPageThree(img: string | undefined, url: string) {
    setSelectedImage(img);
    setProfileURL(url);
  }

  async function handlerFinish() {
    const res = await addProfilePicture({
      _id: "65176d6b9ce0272c671d6583",
      profileURL,
    });
    if (res.message) alert(res.message);
  }

  const isContinueDisabledOnName = page === 1 && userName.trim() === "";
  const isContinueDisabledOnPassword =
    page === 2 && (!passwordsMatch || !passwordValid);

  return (
    <>
      {page === 1 && (
        <PageOne
          page={page}
          totalPages={totalPages}
          onNameChange={handlerNameChange}
        />
      )}
      {page === 2 && (
        <PageTwo
          page={page}
          totalPages={totalPages}
          onPasswordChange={handlePasswordChange}
          onConfirmPasswordChange={handleConfirmPasswordChange}
          passwordsMatch={passwordsMatch}
          passwordValid={passwordValid}
          confirmPasswordValid={confirmPasswordValid}
        />
      )}
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
            onClick={() => {
              if (page === 1 && !isContinueDisabledOnName) {
                setPage((prev) => prev + 1);
              }
              if (page === 2 && !isContinueDisabledOnPassword) {
                setPage((prev) => prev + 1);
              }
            }}
            disabled={
              (page === 1 && isContinueDisabledOnName) ||
              (page === 2 && isContinueDisabledOnPassword)
            }
          >
            Continue
          </Button>
        )}
      </div>
    </>
  );
};

export default OnboardingComponent;
