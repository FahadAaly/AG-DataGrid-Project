import { Button as MuiButton, ButtonProps } from "@mui/material";

export const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <MuiButton disableElevation sx={{ textTransform: "none", borderRadius: 2 }} {...rest}>
    {children}
  </MuiButton>
);