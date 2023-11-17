"use client";

import type { z } from "zod";
import type { SlideImage } from "yet-another-react-lightbox";
import type { MRT_ColumnDef, MRT_TableOptions } from "material-react-table";

import { useState, type FC } from "react";
import Lightbox from "yet-another-react-lightbox";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

import NextLink from "next/link";
import { dayjs } from "@/lib/date";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import { dbClient } from "@/lib/database/client";
import DialogTitle from "@mui/material/DialogTitle";
import { createCase } from "@/services/api/createCase";
import { getCases } from "@/services/database/getCases";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { MRT_Localization_RU } from "material-react-table/locales/ru";
import { createCaseSchema, type CaseTableType, type CreateCaseSchema } from "@/lib/schemas/case";

import { CaseImage } from "../CaseImage";
import { UploadInput } from "../UploadInput";
import { LightboxImage } from "../LightboxImage";

import "yet-another-react-lightbox/styles.css";

export const CaseTable: FC = () => {
  const queryClient = useQueryClient();

  const [slide, setSlide] = useState<SlideImage | null>(null);
  const [errors, setErrors] = useState<z.ZodError<CreateCaseSchema>>();

  const { data: cases } = useQuery({
    queryKey: ["cases"],
    queryFn: getCases(dbClient),
  });

  const { mutateAsync, isPending } = useMutation<unknown, unknown, CreateCaseSchema>({
    mutationKey: ["cases/create"],
    mutationFn: createCase(dbClient),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cases"] }),
  });

  const columns: MRT_ColumnDef<CaseTableType>[] = [
    {
      header: "Название",
      muiEditTextFieldProps: {
        required: true,
        disabled: isPending,
        error: !!errors?.formErrors.fieldErrors.label,
        helperText: errors?.flatten().fieldErrors.label?.[0],
      },
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
        disabled: isPending,
        required: true,
        error: !!errors?.formErrors.fieldErrors.image,
        helperText: errors?.flatten().fieldErrors.image?.[0],
        InputLabelProps: {
          component: () => null,
        },
        InputProps: {
          className: "before:hidden after:hidden",
          components: { Input: UploadInput },
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
            onClick={() => {
              setSlide({
                src: value,
                width: 640,
                height: 640,
                alt: row.original.label,
              });
            }}
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

  const handleCreateRowSave: MRT_TableOptions<CaseTableType>["onCreatingRowSave"] = async ({
    values,
    table,
  }) => {
    const parseResult = createCaseSchema.safeParse(values);

    if (!parseResult.success) {
      setErrors(parseResult.error);
      return;
    }

    await mutateAsync({
      image: values.image,
      label: values.label,
    });

    table.setCreatingRow(null);
  };

  const table = useMaterialReactTable<CaseTableType>({
    columns,
    getRowId: (row) => row.id,
    data: cases ?? [],
    state: { isSaving: isPending },
    enableHiding: false,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    localization: MRT_Localization_RU,
    onCreatingRowSave: isPending ? undefined : handleCreateRowSave,
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
