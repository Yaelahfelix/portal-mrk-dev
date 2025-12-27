import {
  addToast,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@heroui/react";
import { EllipsisVertical, Pencil, Trash } from "lucide-react";
import React, { useState } from "react";
import { Form, SKTarif } from "./form";
import ModalDeleteRowTable from "@/components/modal/deleteRowTable";
import api from "@/core/lib/api";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { ErrorResponse } from "@/core/types/axios";
import { mutate } from "swr";

type Props = { user: SKTarif };

function Actions({ user }: Props) {
  const Router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onOpenChange: onEditOpenChange,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onOpenChange: onDeleteOpenChange,
    onClose: onDeleteClose,
  } = useDisclosure();

  const deleteHandler = async () => {
    setIsLoading(true);
    api
      .delete("/api/portal/master-data/golongan-tarif?id=" + user.id)
      .then((res) => {
        addToast({ color: "success", title: res.data.message });
        onDeleteClose();
        mutate(() => true);
      })
      .catch((err: AxiosError<ErrorResponse>) => {
        addToast({
          title: "Gagal menghapus data!",
          description: err.response?.data.message,
          color: "danger",
        });
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <EllipsisVertical className="w-4 h-4" />
        </DropdownTrigger>
        <DropdownMenu aria-label="Actions">
          <DropdownItem
            key="golongan"
            startContent={<Pencil className="w-4 h-4" />}
            onPress={() =>
              Router.push(`/master-data/golongan-tarif/${user.id}`)
            }
          >
            Golongan
          </DropdownItem>

          <DropdownItem
            key="edit"
            startContent={<Pencil className="w-4 h-4" />}
            onPress={onEditOpen}
          >
            Edit
          </DropdownItem>
          <DropdownItem
            key="delete"
            startContent={<Trash className="w-4 h-4" />}
            onPress={onDeleteOpen}
            color="danger"
          >
            Hapus
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Form
        skTarif={user}
        isEdit={true}
        diclosure={{ isOpen: isEditOpen, onOpenChange: onEditOpenChange }}
      />
      <ModalDeleteRowTable
        isLoading={isLoading}
        onDelete={deleteHandler}
        diclosure={{ isOpen: isDeleteOpen, onOpenChange: onDeleteOpenChange }}
      />
    </>
  );
}

export default Actions;
