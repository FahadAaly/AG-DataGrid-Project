// src/components/AddFilterButton.tsx
import { Button } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import React from "react";

interface FilterButtonProps {
  onClick: () => void;
}

export const FilterButton: React.FC<FilterButtonProps> = ({ onClick }) => (
  <Button
    variant="outlined"
    startIcon={<FilterAltIcon />}
    onClick={onClick}
    sx={{
      borderRadius: 12,
      height: 48,
      fontWeight: 500,
      fontSize: 16,
      textTransform: "none",
    }}
  >
    Add Filter
  </Button>
);
