import type { ImageProps } from "next/image";

import type { FC } from "react";

import Image from "next/image";
import { cn } from "@/lib/utils";

import styles from "./CaseImage.module.scss";

export const CaseImage: FC<ImageProps> = ({ className, alt, ...props }) => {
  return <Image {...props} alt={alt} className={cn(className, styles.root, "bg-white")} />;
};
