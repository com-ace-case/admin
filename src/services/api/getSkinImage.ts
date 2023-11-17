import type { GetSkinImageRequest, GetSkinImageResponse } from "@/lib/steam";

export const getSkinImage = async ({ hashName }: GetSkinImageRequest) => {
  const response = await fetch(`/api/skins/image?hashName=${hashName}`, { cache: "no-cache" });
  const json = (await response.json()) as Promise<GetSkinImageResponse>;
  return json;
};
