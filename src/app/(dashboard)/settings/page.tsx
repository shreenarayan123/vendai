export const dynamic = 'force-dynamic';
import InforBar from "@/components/infobar";
import BillingSettings from "@/components/settings/billing-setings";
import ChangePassword from "@/components/settings/change-password";
import DarkMode from "@/components/settings/dark-mode";
import React from "react";

const Page = () => {
  return (
    <>
      <InforBar />
      <div className="overflow-y-auto w-full chat-window flex-1 h-0 flex flex-col gap-10 p-10">
        <BillingSettings />
        <DarkMode />
        <ChangePassword />
      </div>
    </>
  );
};

export default Page;
