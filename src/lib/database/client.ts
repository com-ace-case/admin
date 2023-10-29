import type { Database } from "@/types/database";

import invariant from "invariant";
import { createClient } from "@supabase/supabase-js";

invariant(process.env.NEXT_PUBLIC_DB_URL, "Missing env var NEXT_PUBLIC_DB_URL");
invariant(process.env.NEXT_PUBLIC_DB_PUBLIC_KEY, "Missing env var NEXT_PUBLIC_DB_PUBLIC_KEY");

export const dbClient = createClient<Database>(
  process.env.NEXT_PUBLIC_DB_URL,
  process.env.NEXT_PUBLIC_DB_PUBLIC_KEY,
);
