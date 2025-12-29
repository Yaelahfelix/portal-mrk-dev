import { DataTable } from "@/components/data-table";
import { columns } from "./columnsKelurahan";
import { Button, Divider, useDisclosure } from "@heroui/react";
import { useIsOpenStore } from "@/core/store/isOpen";
import { Wilayah } from "./type";
import { Form } from "./formRayon";

const TableDetail = ({ wilayah }: { wilayah: Wilayah }) => {
  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h4 className="font-semibold">Detail Rayon</h4>
        <div className="flex flex-row gap-3.5 flex-wrap">
          <Button onPress={onOpen} color="primary">
            Add Rayon
          </Button>

          <Form diclosure={{ isOpen, onOpenChange }} wilayahId={wilayah.id} />
        </div>
      </div>
      <Divider className="my-3" />
      <DataTable
        limitPage="10"
        disabledPagination
        columns={columns}
        data={wilayah.rayon}
      />
    </div>
  );
};

export default TableDetail;
