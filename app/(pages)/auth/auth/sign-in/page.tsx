import LoginComponent from "@/components/pages/login/login-component";
import React from "react";
interface Props {
  searchParams: { callbackUrl: string };
}
const SignInPage: React.FC<Props> = ({ searchParams: { callbackUrl } }) => {
  return (
    <article className="w-full max-w-xs px-6 py-8 bg-white rounded-md shadow-md">
      <h1 className="mb-6 text-4xl font-bold text-center text-accent-500">
        Welcome
      </h1>
      <LoginComponent callbackUrl={callbackUrl}/>
    </article>
  );
};

export default SignInPage;
