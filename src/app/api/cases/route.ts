import type { Tables } from "@/types/database";

import { dbServerClient } from "@/lib/database/server";
import { createCase } from "@/services/database/createCase";
import { NextResponse, type NextRequest } from "next/server";

type Case = Tables<"case">;

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Pick<Case, "image" | "label">;
  const response = await createCase(dbServerClient)(body);
  return NextResponse.json(response);
}
