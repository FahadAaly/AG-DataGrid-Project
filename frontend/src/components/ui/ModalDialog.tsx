// src/components/ModalDialog.tsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  DialogProps,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

interface ModalDialogProps extends DialogProps {
  open: boolean;
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  onClose: () => void;
}

export const ModalDialog: React.FC<ModalDialogProps> = ({
  open,
  title,
  children,
  actions,
  onClose,
  ...dialogProps
}) => (
  <Dialog
    open={open}
    onClose={onClose}
    maxWidth="xs"
    fullWidth
    {...dialogProps}
  >
    <DialogTitle sx={{ fontWeight: 600 }}>
      {title}
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{ position: "absolute", right: 8, top: 8 }}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
    <DialogContent>{children}</DialogContent>
    {actions && <DialogActions>{actions}</DialogActions>}
  </Dialog>
);
