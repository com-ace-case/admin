import dayjs from "dayjs";
import Link from "next/link";
import { dbClient } from "@/services";
import { Card } from "@/components/Card";
import { CaseImage } from "@/components/CaseImage";

export default async function HomePage() {
  const cases = await dbClient.from("case").select("*");

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,250px),1fr))] gap-4 p-4">
      {cases.data?.map((item) => {
        return (
          <Link key={item.id} href={`/cases/${item.id}`}>
            <Card className="grid gap-4 p-4 h-full cursor-pointer hover:shadow-2xl transition-shadow">
              <div className="grid gap-1">
                <h1 className="text-2xl">{item.label}</h1>
                <span className="text-sm text-gray-500">
                  Created at {dayjs(item.created_at).format("LL")}
                </span>
              </div>

              <div className="w-full aspect-square relative">
                <CaseImage
                  fill
                  className="shadow-md rounded object-cover"
                  src={item.image}
                  alt={item.label}
                />
              </div>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
