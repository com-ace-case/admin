import type { DbClient } from "@/types/database";
import type { CreateCaseSchema } from "@/lib/schemas/case";

import { uploadImage } from "../database/uploadImage";

export const createCase = (client: DbClient) => async (variables: CreateCaseSchema) => {
  const fileName = await uploadImage(client)(variables.image);

  return fetch("/api/cases", {
    method: "POST",
    body: JSON.stringify({
      image: fileName,
      label: variables.label,
    }),
  });
};
