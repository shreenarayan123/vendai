import { getCurrentUser } from "@/actions/auth";
import { onGetAllCampaigns, onGetAllCustomers } from "@/actions/mail";
import EmailMarketing from "@/components/email-marketing";
import InfoBar from "@/components/infobar";
import React from "react";

const Page = async () => {
  const user = await getCurrentUser();

  if (!user) return null;
  const customers = await onGetAllCustomers(user.id);
  const campaigns = await onGetAllCampaigns(user.id);

  return (
    <>
      <InfoBar />
      <EmailMarketing
        campaign={campaigns?.campaign!}
        subscription={customers?.subscription!}
        domains={customers?.domains!}
      />
    </>
  );
};

export default Page;
