import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

import { CaseTable } from "@/components/CaseTable";
import { dbServerClient } from "@/lib/database/server";
import { getCases } from "@/services/database/getCases";

const HomePage = async () => {
  const queryClient = new QueryClient();

  const cases = await queryClient.fetchQuery({
    queryKey: ["cases"],
    queryFn: getCases(dbServerClient),
  });

  if (!cases) {
    return (
      <div className="grid place-items-center min-h-[inherit]">
        <div className="text-4xl">No cases found 😔</div>
      </div>
    );
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="p-4">
        <CaseTable />
      </div>
    </HydrationBoundary>
  );
};

export default HomePage;
