import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Loader } from "@/components/ui/Loader";
import { fetchVehicleById } from "@/api/vehicleApi";
import { Vehicle } from "@/types/vehicle";
import { getDisplayFields } from "@/utils/vehicleDetails";

export const VehicleDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);

  const fields = vehicle ? getDisplayFields(vehicle) : [];

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchVehicleById(id)
      .then(setVehicle)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (!vehicle) return <Box>Not found</Box>;

  //  Main: car name, price, year
  const summary = [
    vehicle.Brand,
    vehicle.PriceEuro ? `€${vehicle.PriceEuro}` : undefined,
    vehicle.Year,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <Box
      sx={{
        maxWidth: 950,
        mx: "auto",
        mt: 4,
        px: { xs: 2, md: 4 },
        fontFamily: "monospace",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 5,
        }}
      >
        <Box sx={{ fontSize: 36, letterSpacing: 2 }}>{summary}</Box>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{
            fontFamily: "monospace",
            fontSize: 14,
            px: 3,
            py: 1,
            borderRadius: 2,
          }}
        >
          Back to Grid
        </Button>
      </Box>

      <Box
        sx={{
          fontWeight: 700,
          fontSize: 28,
          mb: 3,
          letterSpacing: 2,
        }}
      >
        Details
      </Box>

      <Box
        sx={{
          border: "1px solid gray",
          borderRadius: 3,
          p: 6,
          minHeight: 250,
          width: { xs: "100%", md: "100%" },
          mx: "auto",
        }}
      >
        <Box sx={{ fontSize: 16 }}>
          {fields.map(
            (field) =>
              field.value && (
                <div key={field.label} style={{ marginBottom: 18 }}>
                  <span style={{ fontWeight: 400, color: "Gray" }}>
                    {field.label}:
                  </span>{" "}
                  <span style={{ fontWeight: 700 }}>{field.value}</span>
                </div>
              )
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default VehicleDetailsPage;
