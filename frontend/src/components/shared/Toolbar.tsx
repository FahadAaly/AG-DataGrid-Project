// src/components/ui/Toolbar.tsx
import { useState } from "react";
import { Box } from "@mui/material";
import { SearchBar } from "@/components/ui/SearchBar";
import { FilterButton } from "./FilterButton";
import { FilterModal } from "./FilterModal";
import { VehicleSearchParams } from "@/types/vehicle";

type FilterArg = {
  column: string;
  operator: VehicleSearchParams["filterType"];
  value: string;
};

interface ToolbarProps {
  onSearch: (value: string) => void;
  onAddFilter: (filter: FilterArg) => void;
  searchValue: string;
  columns?: string[]; // Optional, defaults to common columns
}

export const Toolbar: React.FC<ToolbarProps> = ({
  onSearch,
  onAddFilter,
  searchValue,
  columns = ["Brand", "Model", "PriceEuro", "Year", "Engine"], // adjust as needed
}) => {
  const [filterModalOpen, setFilterModalOpen] = useState(false);

  return (
    <Box display="flex" alignItems="center" gap={2} mb={3}>
      <SearchBar
        value={searchValue}
        onChange={(v) => {
          onSearch(v);
        }}
      />
      <FilterButton onClick={() => setFilterModalOpen(true)} />
      <FilterModal
        open={filterModalOpen}
        columns={columns}
        onClose={() => setFilterModalOpen(false)}
        onAdd={(filter) =>
          onAddFilter({
            ...filter,
            operator: filter.operator as VehicleSearchParams["filterType"],
          })
        }
      />
    </Box>
  );
};
