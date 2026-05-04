export const dynamic = 'force-dynamic';

import InfoBar from "@/components/infobar";
import React, { Suspense } from "react";
import nextDynamic from "next/dynamic";
import { SkeletonCard } from "@/components/installation/Skeleton";

const Installation = nextDynamic(()=> import("@/components/installation"), {suspense:true});

const page = () => {
  return (
    <>
      <InfoBar />
      <div className="overflow-y-auto w-full  px-4  pt-5">
        <Suspense fallback={<SkeletonCard/>}>
        <Installation/>
        </Suspense>
      </div>
    </>
  );
};

export default page;
