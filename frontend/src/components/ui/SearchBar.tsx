// src/components/SearchBar.tsx
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => (
  <TextField
    fullWidth
    size="medium"
    variant="outlined"
    placeholder="Search across all columns..."
    value={value}
    onChange={(e) => onChange(e.target.value)}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon color="action" />
        </InputAdornment>
      ),
      style: { borderRadius: 12, background: "#fff" },
    }}
    sx={{ maxWidth: 400 }}
  />
);
