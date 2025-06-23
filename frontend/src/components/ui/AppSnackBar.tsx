import { Snackbar, Alert, AlertColor, SnackbarOrigin } from "@mui/material";
import React from "react";

export interface AppSnackbarProps {
  open: boolean;
  message: string;
  severity?: AlertColor; // "success" | "error" | "info" | "warning"
  autoHideDuration?: number;
  onClose?: () => void;
  anchorOrigin?: SnackbarOrigin;
}

export const AppSnackbar: React.FC<AppSnackbarProps> = ({
  open,
  message,
  severity = "success",
  autoHideDuration = 3000,
  onClose,
  anchorOrigin = { vertical: "top", horizontal: "center" },
}) => (
  <Snackbar
    open={open}
    autoHideDuration={autoHideDuration}
    onClose={onClose}
    anchorOrigin={anchorOrigin}
  >
    <Alert severity={severity} variant="filled" onClose={onClose}>
      {message}
    </Alert>
  </Snackbar>
);
