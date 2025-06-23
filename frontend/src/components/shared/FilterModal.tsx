// src/components/FilterModal.tsx
import React, { useState, useEffect } from "react";
import { Box, Select, MenuItem, TextField, Button } from "@mui/material";
import { ModalDialog } from "@/components/ui/ModalDialog";
import { VehicleSearchParams } from "@/types/vehicle";

interface FilterModalProps {
  open: boolean;
  columns: string[];
  onClose: () => void;
  onAdd: (filter: { column: string; operator: string; value: string }) => void;
}

const OPERATORS: { value: VehicleSearchParams["filterType"]; label: string }[] =
  [
    { value: "contains", label: "Contains" },
    { value: "equals", label: "Equals" },
    { value: "starts", label: "Starts With" },
    { value: "ends", label: "Ends With" },
    { value: "empty", label: "Is Empty" },
  ];

export const FilterModal: React.FC<FilterModalProps> = ({
  open,
  columns,
  onClose,
  onAdd,
}) => {
  const [column, setColumn] = useState("");
  const [operator, setOperator] = useState("contains");
  const [value, setValue] = useState("");

  useEffect(() => {
    if (!open) {
      setColumn("");
      setOperator("contains");
      setValue("");
    }
  }, [open]);

  const handleAdd = () => {
    onAdd({ column, operator, value });
    onClose();
  };

  return (
    <ModalDialog
      open={open}
      title="Add Filter"
      onClose={onClose}
      actions={
        <>
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleAdd}
            disabled={!column || (operator !== "empty" && !value)}
            variant="contained"
          >
            Add Filter
          </Button>
        </>
      }
    >
      <Box display="flex" flexDirection="column" gap={2} mt={1}>
        <Select
          value={column}
          onChange={(e) => setColumn(e.target.value)}
          displayEmpty
          fullWidth
          size="medium"
        >
          <MenuItem value="" disabled>
            Select a column
          </MenuItem>
          {columns.map((col) => (
            <MenuItem key={col} value={col}>
              {col}
            </MenuItem>
          ))}
        </Select>
        <Select
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
          fullWidth
          size="medium"
        >
          {OPERATORS.map((op) => (
            <MenuItem key={op.value} value={op.value}>
              {op.label}
            </MenuItem>
          ))}
        </Select>
        {operator !== "empty" && (
          <TextField
            placeholder="Enter filter value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            fullWidth
            size="medium"
          />
        )}
      </Box>
    </ModalDialog>
  );
};
