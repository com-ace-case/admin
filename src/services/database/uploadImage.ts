import type { DbClient } from "@/types/database";

export const uploadImage = (client: DbClient) => async (file: File) => {
  const originalFileExtension = file.name.split(".").pop();
  const uuidFileName = `${globalThis.crypto.randomUUID()}.${originalFileExtension}`;

  await client.storage.from("cases").upload(uuidFileName, file);

  return uuidFileName;
};
