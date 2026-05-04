"use server";

import fs from "fs/promises";
import CodeSnippet from "./code-snippet";
import { onGetAllAccountDomains } from "@/actions/settings";

const getCode = async (paths: string[]) => {
  const files = paths.map((path) => fs.readFile(path, "utf-8"));
  return Promise.all(files);
};

const getId = (
  files: string[],
  domainId: string | null,
  backendUrl: string | undefined
) => {
  return files.map((content) =>
    content
      .replace(/\$\{id\}/g, domainId ?? "")
      .replace(/\$\{backendurl\}/g, backendUrl ?? "")
  );
};

const CodeSnippetWrapper = async ({ path }: { path: string[] }) => {
  const domains = await onGetAllAccountDomains();
  const domainId = domains?.domains?.[0]?.id ?? null;
  const backendUrl = process.env.BACKEND_URL;
  const codeFiles = await getCode(path);
  const codeSnippetWithId = getId(codeFiles, domainId, backendUrl);

  return <CodeSnippet snippetCode={codeSnippetWithId} />;
};

export default CodeSnippetWrapper;
