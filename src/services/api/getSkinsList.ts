import type { GetSteamItemsRequest, GetSteamItemsResponse } from "@/lib/steam";

import { STEAM_REQ_LIMIT } from "@/constants";

export const getSkinsList = async ({
  count = STEAM_REQ_LIMIT,
  start = 0,
}: GetSteamItemsRequest = {}) => {
  const response = await fetch(`/api/skins?count=${count}&start=${start}`, { cache: "no-cache" });
  const json = (await response.json()) as Promise<GetSteamItemsResponse>;
  return json;
};
