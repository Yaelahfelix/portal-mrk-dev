"use client";

import { User } from "@/types/user";
import {
  Accordion,
  AccordionItem,
  Alert,
  Button,
  Divider,
  useDisclosure,
} from "@heroui/react";
import { Kecamatan } from "./type";
import { DataTable } from "@/components/data-table";
import { columns } from "./columnsKelurahan";
import { Form } from "./formKelurahan";
import { useIsOpenStore } from "@/core/store/isOpen";

export const TableDetail = (kecamatan: Kecamatan) => {
  const { setIsOpen } = useIsOpenStore();
  return (
    <div className="p-4">
      <div>
        <h4 className="font-semibold">Detail Kelurahan</h4>
        <div className="flex flex-row gap-3.5 flex-wrap">
          <Button onPress={() => setIsOpen(true)} color="primary">
            Add Kelurahan
          </Button>
        </div>
      </div>
      <Divider className="my-3" />
      <DataTable
        limitPage="10"
        disabledPagination
        columns={columns}
        data={kecamatan.kelurahan}
      />
    </div>
  );
};

export const CanTableDetail = (kecamatan: Kecamatan) => {
  return true;
};
