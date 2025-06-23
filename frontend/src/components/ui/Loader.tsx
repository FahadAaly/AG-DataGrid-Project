import { Box, CircularProgress } from "@mui/material";

export const Loader = () => (
  <Box display="flex" justifyContent="center" py={4}>
    <CircularProgress />
  </Box>
);