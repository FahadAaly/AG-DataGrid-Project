import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
}

export const ConfirmDialog = ({
  open,
  title = "Confirm Action",
  message = "Are you sure?",
  onConfirm,
  onCancel,
  confirmText = "Delete",
  cancelText = "Cancel",
  loading = false,
}: ConfirmDialogProps) => (
  <Dialog open={open} onClose={onCancel}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <DialogContentText>{message}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel} disabled={loading}>
        {cancelText}
      </Button>
      <Button onClick={onConfirm} color="error" disabled={loading}>
        {confirmText}
      </Button>
    </DialogActions>
  </Dialog>
);
