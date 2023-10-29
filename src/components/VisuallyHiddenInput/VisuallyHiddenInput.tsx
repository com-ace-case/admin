import { forwardRef, type ComponentProps } from "react";

import { cn } from "@/lib/utils";

import styles from "./VisuallyHiddenInput.module.scss";

export const VisuallyHiddenInput = forwardRef<HTMLInputElement, ComponentProps<"input">>(
  function VisuallyHiddenInput({ className, ...props }, ref) {
    return <input ref={ref} className={cn(styles.root, className)} {...props} />;
  },
);
