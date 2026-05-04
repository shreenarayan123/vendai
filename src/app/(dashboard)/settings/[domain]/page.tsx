import { onGetCurrentDomainInfo } from "@/actions/settings";
import BotTrainingForm from "@/components/forms/settings/bot-training";
import SettingsForm from "@/components/forms/settings";
import InfoBar from "@/components/infobar";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: { domain: string };
};

const DomainSettingsPage = async ({ params }: Props) => {
  const domain = await onGetCurrentDomainInfo(params.domain);
  console.log("domain", domain, "params", params.domain);
  if (!domain) redirect("/dashboard");
  return (
    <>
      <InfoBar />
      <div className="overflow-y-auto w-full chat-window md:flex-1 md:h-0 px-4 md:px-10 pt-5">
        <SettingsForm
          plan={domain.subscription?.plan!}
          chatBot={domain.domains[0].chatBot}
          id={domain.domains[0].id}
          name={domain.domains[0].name}
        />
        <BotTrainingForm id={domain.domains[0].id} />
      </div>
    </>
  );
};

export default DomainSettingsPage;
