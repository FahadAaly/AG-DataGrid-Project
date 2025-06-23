import { TextField, TextFieldProps } from "@mui/material";

export const InputField: React.FC<TextFieldProps> = ({ ...rest }) => (
  <TextField variant="outlined" size="small" fullWidth sx={{ my: 1 }} {...rest} />
);