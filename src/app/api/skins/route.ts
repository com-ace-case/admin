import { getSteamItems } from "@/lib/steam";
import { STEAM_REQ_LIMIT } from "@/constants";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const start = request.nextUrl.searchParams.get("start") ?? 0;
  const count = request.nextUrl.searchParams.get("count") ?? STEAM_REQ_LIMIT;

  const response = await getSteamItems({ count: Number(count), start: Number(start) });

  return NextResponse.json(response);
}
