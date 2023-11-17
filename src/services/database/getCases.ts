import type { DbClient } from "@/types/database";

import invariant from "invariant";
import groupBy from "lodash.groupby";

export const getCases = (client: DbClient) => async () => {
  const { data: cases } = await client.from("case").select("*");

  invariant(cases, "Failed to get cases");

  const files = cases.map((item) => item.image).filter(Boolean);
  const { data: urls } = await client.storage.from("cases").createSignedUrls(files, 3600);
  const urlsMap = groupBy(urls, "path");

  invariant(urls, "Failed to get signed urls");

  return cases.map((item) => {
    return {
      ...item,
      image: urlsMap[item.image]?.[0]?.signedUrl,
    };
  });
};
