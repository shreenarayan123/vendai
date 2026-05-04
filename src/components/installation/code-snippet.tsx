"use client";

import { Suspense } from "react";
import CodeCard from "./code-card";
import { SkeletonCard } from "./Skeleton";

const CodeSnippet = ({ snippetCode }: { snippetCode: string[] }) => {
  return (
    <Suspense fallback={<SkeletonCard />}>
      <div className="space-y-6">
        <div className="w-full flex">
          <CodeCard code={snippetCode} />
        </div>
      </div>
    </Suspense>
  );
};

export default CodeSnippet;
