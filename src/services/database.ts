import type { Database } from "@/types";

import invariant from "invariant";
import { createClient } from "@supabase/supabase-js";

import "server-only";

invariant(process.env.DB_URL, "Missing env var DB_URL");
invariant(process.env.DB_SECRET_KEY, "Missing env var DB_SECRET_KEY");

export const dbClient = createClient<Database>(process.env.DB_URL, process.env.DB_SECRET_KEY);
