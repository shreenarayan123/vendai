import { LogOut, Menu} from "lucide-react";
import Image from "next/image";
import Logo from "../../app/assets/logo.png";
import React from "react";
import DomainMenu from "./domain-menu";
import MenuItem from "./menu-item";
import { SIDE_BAR_MENU } from "@/constants/menu";

type Props = {
  onExpand(): void;
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

const MaxMenu = ({ current, domains, onExpand, onSignOut }: Props) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center py-5 w-full px-4 cursor-pointer border-b-[1px] border-gray-300">
        <div className="relative flex gap-3">
          <Image
            src={Logo}
            alt="Logo"
            className="hidden md:block lg:block"
            width={27}
            height={27}
          />
          <span className="text-xl font-bold">Vend AI</span>
        </div>

        <Menu
          className="cursor-pointer animate-fade-in opacity-0 delay-300 fill-mode-forwards"
          onClick={onExpand}
        />
      </div>
      <div className=" py-3 px-4 animate-fade-in opacity-0 delay-300 fill-mode-forwards flex flex-col justify-between h-full pt-5">
        <div className="flex flex-col ">
          <p className="text-xs text-gray-500 mb-3">MENU</p>
          {SIDE_BAR_MENU.map((menu, key) => (
            <MenuItem size="max" {...menu} key={key} current={current} />
          ))}
          <DomainMenu domains={domains} />
        </div>
        <div className="flex flex-col">
          <p className="text-xs text-gray-500 mb-3">OPTIONS</p>
          <MenuItem
            size="max"
            label="Sign out"
            icon={<LogOut />}
            onSignOut={onSignOut}
          />
        </div>
      </div>
    </div>
  );
};

export default MaxMenu;
