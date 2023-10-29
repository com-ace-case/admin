import type { Tables } from "@/types/database";

type Case = Tables<"case">;

export const createCase = (variables: Pick<Case, "image" | "label">) => {
  return fetch("/api/cases", {
    method: "POST",
    body: JSON.stringify(variables),
  });
};
