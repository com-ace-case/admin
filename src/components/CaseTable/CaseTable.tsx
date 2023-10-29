"use client";

import type { Tables } from "@/types/database";
import type { SlideImage } from "yet-another-react-lightbox";
import type { MRT_ColumnDef, MRT_TableOptions } from "material-react-table";

import Lightbox from "yet-another-react-lightbox";
import { forwardRef, useState, type FC } from "react";
import type { ChangeEvent, ComponentProps } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

import NextLink from "next/link";
import { dayjs } from "@/lib/date";
import Button from "@mui/material/Button";
import { createCase } from "@/services/api";
import { getCases } from "@/services/database";
import { dbClient } from "@/lib/database/client";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { MRT_Localization_RU } from "material-react-table/locales/ru";
import { DialogActions, DialogContent, DialogTitle, Link } from "@mui/material";

import { CaseImage } from "../CaseImage";
import { LightboxImage } from "../LightboxImage";
import { VisuallyHiddenInput } from "../VisuallyHiddenInput";

import "yet-another-react-lightbox/styles.css";

type Case = Tables<"case">;

export const CaseTable: FC = () => {
  const queryClient = useQueryClient();

  const [slide, setSlide] = useState<SlideImage | null>(null);

  const { data: cases } = useQuery({
    queryKey: ["cases"],
    queryFn: getCases(dbClient),
  });

  const { mutateAsync } = useMutation<unknown, unknown, Pick<Case, "label" | "image">>({
    mutationKey: ["cases/create"],
    mutationFn: createCase,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cases"] }),
  });

  const columns: MRT_ColumnDef<Case>[] = [
    {
      header: "Название",
      accessorKey: "label",
      Cell: ({ cell, row }) => {
        return (
          <Link href={`/cases/${row.original.id}`} component={NextLink}>
            {cell.getValue<string>()}
          </Link>
        );
      },
    },
    {
      header: "Картинка",
      accessorKey: "image",
      enableSorting: false,
      enableColumnFilter: false,
      enableColumnActions: false,
      muiEditTextFieldProps: {
        InputLabelProps: { component: () => null },
        InputProps: {
          className: "before:hidden after:hidden",
          components: {
            Input: forwardRef<HTMLInputElement, ComponentProps<"input">>(function FileInput(
              { onFocus, onBlur, onChange },
              ref,
            ) {
              return (
                <Button
                  fullWidth
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                >
                  Загрузить файл
                  <VisuallyHiddenInput
                    ref={ref}
                    accept="image/jpeg, image/png"
                    type="file"
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={async (event) => {
                      const file = event.target.files?.[0];

                      if (!file) {
                        return;
                      }

                      const originalFileExtension = file.name.split(".").pop();
                      const uuidFileName = `${window.crypto.randomUUID()}.${originalFileExtension}`;

                      await dbClient.storage.from("cases").upload(uuidFileName, file);

                      onChange?.({
                        target: { value: uuidFileName },
                      } as ChangeEvent<HTMLInputElement>);
                    }}
                  />
                </Button>
              );
            }),
          },
        },
      },
      Cell: ({ cell, row }) => {
        const value = cell.getValue<string>();
        return (
          <CaseImage
            className="cursor-pointer"
            width={64}
            height={64}
            src={value}
            alt={row.original.label}
            onClick={() =>
              setSlide({
                src: value,
                width: 640,
                height: 640,
                alt: row.original.label,
              })
            }
          />
        );
      },
    },
    {
      header: "Дата создания",
      Edit: () => null,
      accessorFn: (row) => dayjs(row.created_at).format("LL"),
    },
  ];

  const handleCreateRowSave: MRT_TableOptions<Case>["onCreatingRowSave"] = async ({
    values,
    table,
  }) => {
    await mutateAsync({
      image: values.image,
      label: values.label,
    });

    table.setCreatingRow(null);
  };

  const table = useMaterialReactTable<Case>({
    columns,
    data: cases ?? [],
    enableHiding: false,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    localization: MRT_Localization_RU,
    onCreatingRowSave: handleCreateRowSave,
    renderTopToolbarCustomActions: ({ table }) => {
      return (
        <Button variant="contained" color="success" onClick={() => table.setCreatingRow(true)}>
          Создать новый кейс
        </Button>
      );
    },
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle className="text-xl">Создать новый кейс</DialogTitle>
        <DialogContent className="grid gap-4">{internalEditComponents}</DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
  });

  return (
    <>
      <MaterialReactTable table={table} />

      <Lightbox
        carousel={{ finite: true }}
        slides={[slide].filter(Boolean)}
        open={!!slide}
        close={() => setSlide(null)}
        render={{ slide: LightboxImage }}
      />
    </>
  );
};
