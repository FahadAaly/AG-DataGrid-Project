import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Pagination from "@mui/material/Pagination";

import { useDebounce } from "@/hooks/useDebounce";
import { usePaginated } from "@/hooks/usePaginated";
import { Toolbar } from "@/components/shared/Toolbar";
import { GenericGrid } from "./GenericGrid";
import { Box } from "@mui/material";

import { Loader } from "@/components/ui/Loader";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { AppSnackbar } from "@/components/ui/AppSnackBar";
import { AppIconButton } from "@/components/ui/AppIconButton";

import { Vehicle, VehicleSearchParams } from "@/types/vehicle";
import { deleteVehicle } from "@/api/vehicleApi";

import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

const PAGE_SIZE = 20;

export interface FilterItem {
  column: string;
  operator: VehicleSearchParams["filterType"];
  value: string;
}

const DataGrid = () => {
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const columns = [
    { field: "Brand" },
    { field: "Model" },
    { field: "PriceEuro" },
    {
      headerName: "Actions",
      cellRenderer: (params: { data: any }) => (
        <>
          <AppIconButton
            onClick={() => {
              navigate(`/vehicle/${params.data._id}`);
            }}
            color="primary"
          >
            <VisibilityIcon />
          </AppIconButton>
          <AppIconButton
            color="error"
            onClick={async () => {
              handleDeleteClick(params.data._id);
            }}
          >
            <DeleteIcon />
          </AppIconButton>
        </>
      ),
    },
  ];
  // Filter chips
  const [filters, setFilters] = useState<FilterItem[]>([]);

  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 500);

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    setDeleteLoading(true);
    try {
      await deleteVehicle(deleteId);
      refetch();
      setConfirmOpen(false);
      setDeleteId(null);
      setSnackbarOpen(true);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleCancel = () => {
    setConfirmOpen(false);
    setDeleteId(null);
  };

  const filterParams = filters.length
    ? {
        filters: filters.map((f) => ({
          field: f.column,
          type: f.operator,
          value: f.value,
        })),
      }
    : {};

  const apiFilters = {
    ...filterParams,
    search: debouncedSearch,
  };

  const {
    items: vehicles,
    pagination,
    loading,
    setPage,
    setFilters: setApiFilters,
    refetch,
  } = usePaginated<Vehicle, any>(`api/vehicles`, apiFilters, 1, PAGE_SIZE);

  useEffect(() => {
    setApiFilters(apiFilters);
    // eslint-disable-next-line
  }, [debouncedSearch, filters]);

  const handleAddFilter = (filter: FilterItem) => {
    setFilters((prev) =>
      prev.some(
        (f) =>
          f.column === filter.column &&
          f.operator === filter.operator &&
          f.value === filter.value
      )
        ? prev
        : [...prev, filter]
    );
  };

  const handleRemoveFilter = (idx: number) => {
    setFilters((prev) => prev.filter((_, i) => i !== idx));
  };

  if (loading || deleteLoading) return <Loader />;
  const handleSnackbarClose = () => setSnackbarOpen(false);

  return (
    <>
      <Toolbar
        searchValue={searchValue}
        onSearch={setSearchValue}
        onAddFilter={handleAddFilter}
      />
      {/* FILTER SELECTED CHIPS */}
      <Stack direction="row" spacing={1} mt={2} mb={1}>
        {filters.map((filter, idx) => (
          <Chip
            key={idx}
            label={`${filter.column} ${filter.operator} "${filter.value}"`}
            onDelete={() => handleRemoveFilter(idx)}
            color="primary"
            variant="filled"
          />
        ))}
      </Stack>
      <GenericGrid rows={vehicles} columnDefs={columns} />
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination
          count={pagination.totalPages}
          page={pagination.page}
          onChange={(_, value) => setPage(value)}
        />
      </Box>
      <ConfirmDialog
        open={confirmOpen}
        title="Delete Vehicle"
        message="Are you sure you want to delete this vehicle? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancel}
        loading={loading}
      />
      <AppSnackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message="Vehicle deleted successfully!"
      />
    </>
  );
};

export default DataGrid;
