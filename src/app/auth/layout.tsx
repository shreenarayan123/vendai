"use server";

import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import Logo from "../../app/assets/logo.png";
import Link from "next/link";
import { getCurrentUser } from "@/actions/auth";

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  const user = await getCurrentUser();

  if (user) redirect("/");

  return (
    <div className="h-screen flex w-full justify-center">
      <div className="w-[600px] ld:w-full flex flex-col items-start p-6">
        <div className="flex items-center gap-2">
          <Link href="/">
            <div className="relative cursor-pointer">
              <Image src={Logo} alt="Logo" width={36} height={36} />{" "}
            </div>{" "}
          </Link>
          <span className="text-xl font-bold">Vend AI</span>
        </div>
        {children}
      </div>
      <div className="hidden lg:flex flex-1 w-full max-h-full max-w-4000px overflow-hidden relative bg-cream  flex-col pt-10 pl-24 gap-3">
        <h2 className="text-gravel md:text-4xl font-bold">
          Hi, I’m your AI powered sales assistant, Echo!
        </h2>
        <p className="text-iridium md:text-sm mb-10">
          Echo is capable of capturing lead information without a form... <br />
          something never done before 😉
        </p>
        <Image
          src="/images/app-ui.jpg"
          alt="app image"
          loading="lazy"
          sizes="30"
          className="absolute !w-[1200px] top-48 rounded-2xl border-4 border-black"
          width={0}
          height={0}
        />
      </div>
    </div>
  );
};

export default Layout;
