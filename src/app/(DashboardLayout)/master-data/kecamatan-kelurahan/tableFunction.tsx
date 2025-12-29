"use client";

import {
  Button,
  Input,
  useDisclosure,
} from "@heroui/react";
import React, { useState, useEffect, useCallback } from "react";
import { Form } from "./form";
import { useSearchParams } from "next/navigation";
import useUpdateQuery from "@/components/hooks/useUpdateQuery";
import { Search } from "lucide-react";

function TableFunction({ limit }: { limit: string }) {
  const searchParams = useSearchParams();
  const updateQuery = useUpdateQuery();

  // Initialize with URL param
  const [query, setQuery] = useState(searchParams.get("q") || "");

  // Debounce search - update URL after user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      updateQuery({ q: query || null, page: 1 }); // Reset to page 1 when searching
    }, 200); // 200ms debounce for faster search

    return () => clearTimeout(timer);
  }, [query, updateQuery]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="flex justify-between flex-wrap gap-4 items-center">
      <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
        <Input
          value={query}
          onValueChange={setQuery}
          classNames={{
            input: "w-full",
            mainWrapper: "w-full",
          }}
          placeholder="Cari Nama..."
          isClearable
          onClear={() => setQuery("")}
        />
      </div>

      <div className="flex flex-row gap-3.5 flex-wrap">
        <Button onPress={onOpen} color="primary">
          Add Kecamatan
        </Button>
        <Form diclosure={{ isOpen, onOpenChange }} />
      </div>
    </div>
  );
}

export default TableFunction;
