import { onGetAllAccountDomains } from "@/actions/settings";
import ConversationMenu from "@/components/conversation";
import Messenger from "@/components/conversation/messenger";
import InfoBar from "@/components/infobar";
import { Separator } from "@/components/ui/separator";
import React from "react";

const ConversationPage = async () => {
  const domains = await onGetAllAccountDomains();
  return (
    <div className="md:w-full h-full  flex flex-col md:flex-row overflow-y-scroll md:overflow-auto">
      <ConversationMenu domains={domains?.domains} />

      <Separator orientation="vertical" />
      <div className="w-full flex flex-col">
        <div className="px-5">
          <InfoBar />
        </div>
        <Messenger />
      </div>
    </div>
  );
};

export default ConversationPage;
