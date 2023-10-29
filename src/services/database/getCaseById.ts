import type { DbClient } from "@/types/database";

import invariant from "invariant";

export const getCaseById = (client: DbClient) => async (id: string) => {
  const { data: item } = await client.from("case").select("*").eq("id", id).single();

  invariant(item, "Case not found");

  const { data: url } = await client.storage.from("cases").createSignedUrl(item.image, 3600);

  invariant(url, "Failed to get signed url");

  return {
    ...item,
    image: url.signedUrl,
  };
};
