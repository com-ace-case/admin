import type { DbClient } from "@/types/database";

import invariant from "invariant";

export const getCases = (client: DbClient) => async () => {
  const { data: cases } = await client.from("case").select("*");

  invariant(cases, "Failed to get cases");

  const files = cases.map((item) => item.image);
  const { data: urls } = await client.storage.from("cases").createSignedUrls(files, 3600);

  invariant(urls, "Failed to get signed urls");

  return cases.map((item, index) => ({
    ...item,
    image: urls[index].signedUrl,
  }));
};
