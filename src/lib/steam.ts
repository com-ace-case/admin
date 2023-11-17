import type { GetMarketListingsResponse } from "steam-market-fetcher";

import SteamMarketFetcher from "steam-market-fetcher";
import { CSGO_APP_ID, STEAM_REQ_LIMIT } from "@/constants";

import "server-only";

export interface GetSteamItemsRequest {
  start?: number;
  count?: number;
}

export type GetSteamItemsSuccessResponse = GetMarketListingsResponse & { success: true };
export type GetSteamItemFailureResponse = { success: false };
export type GetSteamItemsResponse = GetSteamItemsSuccessResponse | GetSteamItemFailureResponse;

const market = new SteamMarketFetcher({
  format: "json",
  currency: "RUB",
});

export const getSteamItems = async ({
  start = 0,
  count = STEAM_REQ_LIMIT,
}: GetSteamItemsRequest = {}): Promise<GetSteamItemsResponse> => {
  try {
    const response = await market.getMarketListings({
      start,
      count,
      appid: CSGO_APP_ID,
    });

    if (!response || !response.success) {
      return {
        success: false,
      };
    }

    return response;
  } catch {
    return {
      success: false,
    };
  }
};

export interface GetSkinImageRequest {
  hashName: string;
}

export interface GetSkinImageSuccessResponse {
  success: true;
  image: string;
}

export interface GetSkinImageFailureResponse {
  success: false;
}

export type GetSkinImageResponse = GetSkinImageSuccessResponse | GetSkinImageFailureResponse;

export const getSteamItemImage = async ({
  hashName,
}: GetSkinImageRequest): Promise<GetSkinImageResponse> => {
  try {
    const response = await market.getItemImage({
      appid: CSGO_APP_ID,
      market_hash_name: hashName,
    });

    if (!response || !response.startsWith("https")) {
      return {
        success: false,
      };
    }

    return {
      success: true,
      image: response,
    };
  } catch {
    return {
      success: false,
    };
  }
};
