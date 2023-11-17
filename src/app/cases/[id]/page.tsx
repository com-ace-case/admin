import type { PageProps } from "@/types/router";

import type { FC } from "react";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

import Link from "next/link";
import { dayjs } from "@/lib/date";
import { getSteamItems } from "@/lib/steam";
import { CaseImage } from "@/components/CaseImage";
import { SkinsTable } from "@/components/SkinsTable";
import { dbServerClient } from "@/lib/database/server";
import ArrowBackIcon from "@mui/icons-material/ArrowBackIos";
import { getCaseById } from "@/services/database/getCaseById";

interface CasePageParams {
  id: string;
}

const CasePage: FC<PageProps<CasePageParams>> = async ({ params }) => {
  const item = await getCaseById(dbServerClient)(params.id);

  if (!item) {
    return (
      <div className="grid place-items-center min-h-[inherit]">
        <div className="text-4xl">Not found 😔</div>
      </div>
    );
  }

  const queryClient = new QueryClient();

  await queryClient.fetchInfiniteQuery({
    initialPageParam: 0,
    queryKey: ["skins/list"],
    queryFn: () => getSteamItems(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="grid gap-4 grid-rows-[auto,auto,1fr] p-4">
        <div className="flex items-center w-full gap-2 border-0 border-b border-gray-300 border-solid">
          <Link href="..">
            <ArrowBackIcon className="cursor-pointer" />
          </Link>

          <h1 className="flex-1 text-2xl">{item.label}</h1>
        </div>

        <div className="grid grid-flow-col grid-cols-[auto,1fr] gap-4">
          <div className="w-[300px] aspect-square relative">
            <CaseImage
              fill
              className="object-cover rounded shadow-md"
              src={item.image}
              alt={item.label}
            />
          </div>

          <span className="text">Создано {dayjs(item.created_at).format("LL")}</span>
        </div>

        <div className="grid">
          <SkinsTable />
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default CasePage;
