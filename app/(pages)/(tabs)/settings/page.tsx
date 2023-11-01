import SettingsComponent from "@/components/pages/settings/component";
import React from "react";
import { Toaster } from "@/components/ui/toaster";

const page = () => {
  return (
    <>
      <Toaster />
      <SettingsComponent />
    </>
  );
};

export default page;
