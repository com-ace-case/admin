import type { DbClient, Tables } from "@/types/database";

type Case = Tables<"case">;

export const createCase =
  (client: DbClient) => async (variables: Pick<Case, "label" | "image">) => {
    const { data } = await client.from("case").insert(variables).select();
    return data?.[0];
  };
