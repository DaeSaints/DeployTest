"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import PageOne from "./components/page-one";
import PageTwo from "./components/page-two";
import PageThree from "./components/page-three";
import { addProfilePicture } from "@/lib/actions/user.action";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

// UPLOADTHING
import { ourFileRouter } from "@/app/(routes)/api/uploadthing/core";
import { useUploadThing } from "@/lib/uploadthing";
import { Loader2 } from "lucide-react";

// UPLOADTHING
import { ourFileRouter } from "@/app/(routes)/api/uploadthing/core";
import { useUploadThing } from "@/lib/uploadthing";
import { Loader2 } from "lucide-react";

type ProfilePictureParams = {
  _id: string;
  name: string;
  password: string;
  profileURL: string;
};

const OnboardingComponent = () => {
  const { toast } = useToast();
  const router = useRouter();
  const totalPages = 3;
  const [page, setPage] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );
  const [selectedFile, setSelectedFile] = useState<File[]>([]);

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

  // UPLOADTHING
  const { startUpload, isUploading } = useUploadThing("profileImage", {
    onClientUploadComplete: (url) => {
      return url;
    },
  });
  function handlerPageThree(img: string | undefined, file: File[]) {
    setSelectedImage(img);
    setSelectedFile(file);
  }

  async function handlerFinish() {
    if (page === 3) {
      try {
        if (userName && password && profileURL) {
          const params: ProfilePictureParams = {
            _id: "6538dd2367526cb4e19190f0",
            name: userName,
            password,
            profileURL,
          };

          const res = await addProfilePicture(params);

          if (res.message) {
            toast({
              variant: "success",
              title: "Successfully Onboarded",
              description: "Welcome to Umonics LMS",
            });
          }
        } else {
          toast({
            variant: "destructive",
            title: "Missing Information",
            description: "Please fill in all required information.",
          });
        }
        router.push("/dashboard");
      } catch (error) {
        console.error("Error saving data to MongoDB:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "An error occurred while saving your data.",
        });
      }
    }
  }

  async function uploadBtn() {
    const res = await startUpload(selectedFile);
    console.log(res);
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
          <>
            <Button size={"lg"} type="button" onClick={handlerFinish}>
              Finish
            </Button>
            <Button
              size={"lg"}
              type="button"
              disabled={isUploading}
              onClick={uploadBtn}
            >
              Upload
              {isUploading && <Loader2 className="w-6 h-6 animate-spin" />}
            </Button>
          </>
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
