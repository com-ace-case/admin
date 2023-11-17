import type { SteamMarketListing } from "steam-market-fetcher";

import type { FC } from "react";
import { useQuery } from "@tanstack/react-query";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { getSkinImage } from "@/services/api/getSkinImage";
import CircularProgress from "@mui/material/CircularProgress";
import BrokenImageIcon from "@mui/icons-material/BrokenImage";

export interface SkinCardProps {
  className?: string;
  skin: SteamMarketListing;
}

export const SkinCard: FC<SkinCardProps> = ({ skin, className }) => {
  const { data, isLoading, isFetched, isError } = useQuery({
    retry: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    queryKey: ["skins/image", skin.hash_name],
    queryFn: () => getSkinImage({ hashName: skin.hash_name }),
  });

  return (
    <div
      className={cn(
        className,
        "relative aspect-square grid place-items-center rounded-md",
        isFetched && "shadow-md hover:shadow-lg transition-shadow",
      )}
    >
      {isLoading && <CircularProgress />}

      {isFetched && (isError || !data?.success) && <BrokenImageIcon className="text-9xl" />}

      {isFetched && data?.success && <Image src={data.image} alt={skin.name} fill />}
    </div>
  );
};
