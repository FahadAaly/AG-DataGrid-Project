import React from "react";
import IconButton from "@mui/material/IconButton";
import { SxProps, Theme } from "@mui/material";

type AppIconButtonProps = {
  children: React.ReactNode;
  color?:
    | "inherit"
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
  size?: "small" | "medium" | "large";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  ariaLabel?: string;
  sx?: SxProps<Theme>;
  disabled?: boolean;
};

export const AppIconButton: React.FC<AppIconButtonProps> = ({
  children,
  color = "default",
  size = "medium",
  onClick,
  ariaLabel,
  sx,
  disabled,
}) => (
  <IconButton
    color={color}
    size={size}
    onClick={onClick}
    aria-label={ariaLabel}
    sx={sx}
    disabled={disabled}
  >
    {children}
  </IconButton>
);
