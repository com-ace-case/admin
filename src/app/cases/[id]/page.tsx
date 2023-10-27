import type { PageProps } from "@/types";

import type { FC } from "react";

import dayjs from "dayjs";
import { dbClient } from "@/services";
import { Card } from "@/components/Card";
import { CaseImage } from "@/components/CaseImage";

interface CasePageParams {
  id: string;
}

const CasePage: FC<PageProps<CasePageParams>> = async ({ params }) => {
  const { data: item } = await dbClient.from("case").select("*").eq("id", params.id).single();

  if (!item) {
    return (
      <div className="grid place-items-center min-h-[inherit]">
        <div className="text-4xl">Not found 😔</div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Card className="grid gap-4 p-4 w-[250px]">
        <div className="grid gap-1">
          <h1 className="text-2xl">{item.label}</h1>
          <span className="text-sm text-gray-500">Created at {dayjs(item.created_at).format("LL")}</span>
        </div>

        <div className="w-full aspect-square relative">
          <CaseImage fill className="shadow-md rounded object-cover" src={item.image} alt={item.label} />
        </div>
      </Card>
    </div>
  );
};

export default CasePage;
