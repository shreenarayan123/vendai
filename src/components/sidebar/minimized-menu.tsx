import { SIDE_BAR_MENU } from "@/constants/menu";

import React from "react";

import { LogOut} from "lucide-react";
import MenuItem from "./menu-item";
import DomainMenu from "./domain-menu";
import Image from "next/image";
import Logo from "../../app/assets/logo.png";

type Props = {
  onShrink(): void;
  current: string;
  onSignOut(): void;
  domains:
    | {
        id: string;
        name: string;
        icon: string | null;
      }[]
    | null
    | undefined;
};

const MiniMenu = ({ onShrink, current, onSignOut, domains }: Props) => {
   
  return (
    <div className="">
      <div onClick={onShrink} className="relative py-5 w-full flex justify-center cursor-pointer border-b-[1px] border-gray-300">
        <Image src={Logo} alt="Logo" width={27} height={27} />{" "}
      </div>{" "}
      <div className=" px-4 py-3  animate-fade-in opacity-0 delay-300 fill-mode-forwards flex flex-col justify-between h-full pt-5 cursor-pointer">
        <div className="flex flex-col">
          {SIDE_BAR_MENU.map((menu, key) => (
            <MenuItem size="min" {...menu} key={key} current={current} />
          ))}
          <DomainMenu min domains={domains} />
        </div>
        <div className="flex flex-col mt-10">
          <MenuItem
            size="min"
            label="Sign out"
            icon={<LogOut />}
            onSignOut={onSignOut}
          />
        </div>
      </div>
    </div>
  );
};

export default MiniMenu;
