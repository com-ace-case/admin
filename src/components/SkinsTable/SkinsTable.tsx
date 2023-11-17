"use client";

import type { FC } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import { cn } from "@/lib/utils";
import { getSkinsList } from "@/services/api/getSkinsList";

import { SkinCard } from "../SkinCard";

export interface SkinsTableProps {
  className?: string;
}

export const SkinsTable: FC<SkinsTableProps> = ({ className }) => {
  const { data } = useInfiniteQuery({
    queryKey: ["skins/list"],
    initialPageParam: 0,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    enabled: false,
    queryFn: async ({ pageParam }) => getSkinsList({ start: pageParam }),
    getNextPageParam: (lastPage) => (lastPage.success ? lastPage.start + 1 : 0),
    getPreviousPageParam: (firstPage) => (firstPage.success ? firstPage.start - 1 : 0),
  });

  return (
    <div
      className={cn(
        className,
        "border-1 rounded border-solid border-gray-300 grid gap-4 p-4",
        data?.pages[0].success && "gap-4 grid-cols-3 grid-rows-3 md:grid-rows-6 md:grid-cols-6",
        !data?.pages[0].success && "place-items-center",
      )}
    >
      {data?.pages.map((page, index) => {
        if (!page.success) {
          return (
            <div key={index} className="text-xl">
              Не удалось загрузить скины 😔
            </div>
          );
        }

        return page.results.map((result) => {
          return <SkinCard key={result.hash_name} skin={result} />;
        });
      })}
    </div>
  );
};
