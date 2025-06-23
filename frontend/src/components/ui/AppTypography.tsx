import { Typography, TypographyProps } from "@mui/material";
import React from "react";

interface AppTypographyProps extends TypographyProps {}

export const AppTypography: React.FC<AppTypographyProps> = ({
  variant = "body1",
  fontWeight,
  gutterBottom = false,
  color,
  children,
  ...props
}) => {
  return (
    <Typography
      variant={variant}
      fontWeight={fontWeight}
      gutterBottom={gutterBottom}
      color={color}
      {...props}
    >
      {children}
    </Typography>
  );
};
