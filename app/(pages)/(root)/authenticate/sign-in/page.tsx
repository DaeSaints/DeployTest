import LoginComponent from "@/components/pages/login/login-component";
import React from "react";
interface Props {
  searchParams: { callbackUrl: string };
}
const SignInPage: React.FC<Props> = ({ searchParams: { callbackUrl } }) => {
  return (
    <>
      <LoginComponent callbackUrl={callbackUrl} />
    </>
  );
};

export default SignInPage;
