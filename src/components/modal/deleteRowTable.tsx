import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";
import { Trash2 } from "lucide-react";
import React from "react";

type Props = {
  onDelete: () => void;
  diclosure: { isOpen: boolean; onOpenChange: () => void };
  isLoading: boolean;
  title?: string;
  desc?: string;
  buttonText?: string;
};

const ModalDeleteRowTable = ({
  onDelete,
  diclosure,
  isLoading,
  title = "Apakah kamu yakin ingin menghapus data ini?",
  desc = "Data yang dihapus akan hilang secara permanen dan tidak dapat dikembalikan.",
  buttonText = "Hapus",
}: Props) => {
  const { isOpen, onOpenChange } = diclosure;
  return (
    <Dialog open={isOpen} onClose={onOpenChange} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{desc}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button color="inherit" variant="outlined" onClick={onOpenChange}>
          Batal
        </Button>
        <Button
          color="error"
          variant="contained"
          onClick={onDelete}
          disabled={isLoading}
          startIcon={
            isLoading ? (
              <CircularProgress size={16} color="inherit" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )
          }
        >
          {buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalDeleteRowTable;
