"use client";

import type { Tables } from "@/types/database";

import z from "zod";

export type CaseTableType = Tables<"case">;

export const createCaseSchema = z.object({
  label: z.string().min(1).max(255),
  image: typeof window === "undefined" ? z.any() : z.instanceof(File),
});

export type CreateCaseSchema = z.infer<typeof createCaseSchema>;
