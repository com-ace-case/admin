import { forwardRef } from "react";
import type { ChangeEvent, ComponentProps } from "react";

import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { VisuallyHiddenInput } from "../VisuallyHiddenInput";

export const UploadInput = forwardRef<HTMLInputElement, ComponentProps<"input">>(
  function UploadInput({ value: _, disabled, onBlur, onFocus, onChange, ...props }, ref) {
    return (
      <Button
        fullWidth
        disabled={disabled}
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
      >
        Загрузить файл
        <VisuallyHiddenInput
          {...props}
          disabled={disabled}
          ref={ref}
          accept="image/jpeg, image/png"
          type="file"
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={async (event) => {
            const file = event.target.files?.[0];

            const nextEvent = {
              target: { value: file },
            } as unknown as ChangeEvent<HTMLInputElement>;

            onChange?.(nextEvent);
          }}
        />
      </Button>
    );
  },
);
