import type { GetSkinImageFailureResponse } from "@/lib/steam";

import { getSteamItemImage } from "@/lib/steam";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const hashName = request.nextUrl.searchParams.get("hashName");

  if (!hashName) {
    return NextResponse.json<GetSkinImageFailureResponse>({ success: false });
  }

  const response = await getSteamItemImage({ hashName });

  return NextResponse.json(response);
}
