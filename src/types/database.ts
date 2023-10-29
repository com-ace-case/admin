import type { PostgrestError, SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "./database-generated";

export type Tables<
  T extends keyof Database["public"]["Tables"] = keyof Database["public"]["Tables"],
> = Database["public"]["Tables"][T]["Row"];

export type Enums<T extends keyof Database["public"]["Enums"] = keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T];

export type DbResult<T> = T extends PromiseLike<infer U> ? U : never;
export type DbResultOk<T> = T extends PromiseLike<{ data: infer U }> ? Exclude<U, null> : never;
export type DbResultError = PostgrestError;

export type DbClient = SupabaseClient<Database, "public">;

export type { Json, Database } from "./database-generated";
