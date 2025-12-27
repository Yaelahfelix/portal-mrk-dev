import { DataTable } from "@/components/data-table";
import { columns } from "./columnsKelurahan";
import { Button, Divider, useDisclosure } from "@heroui/react";
import { useIsOpenStore } from "@/core/store/isOpen";
import { Kecamatan } from "./type";
import { Form } from "./formKelurahan";

const TableDetail = ({ kecamatan }: { kecamatan: Kecamatan }) => {
  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h4 className="font-semibold">Detail Kelurahan</h4>
        <div className="flex flex-row gap-3.5 flex-wrap">
          <Button onPress={onOpen} color="primary">
            Add Kelurahan
          </Button>

          <Form diclosure={{ isOpen, onOpenChange }} kecId={kecamatan.id} />
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

export default TableDetail;
