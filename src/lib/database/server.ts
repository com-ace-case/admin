import type { Database } from "@/types/database";

import invariant from "invariant";
import { createClient } from "@supabase/supabase-js";

import "server-only";

invariant(process.env.NEXT_PUBLIC_DB_URL, "Missing env var NEXT_PUBLIC_DB_URL");
invariant(process.env.DB_SECRET_KEY, "Missing env var DB_SECRET_KEY");

export const dbServerClient = createClient<Database>(
  process.env.NEXT_PUBLIC_DB_URL,
  process.env.DB_SECRET_KEY,
);
