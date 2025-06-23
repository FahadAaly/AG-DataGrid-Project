import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Stack,
  useTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Loader } from "@/components/ui/Loader";
import { fetchVehicleById } from "@/api/vehicleApi";
import { Vehicle } from "@/types/vehicle";
import { getDisplayFields } from "@/utils/vehicleDetails";

export const VehicleDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
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

  // Main: car name, price, year
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
        maxWidth: 700,
        mx: "auto",
        mt: 6,
        px: { xs: 2, md: 0 },
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 4,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: 1 }}>
          {summary}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{
            fontWeight: 600,
            borderRadius: 2,
            borderColor: theme.palette.primary.light,
            color: theme.palette.primary.main,
            transition: "all 0.15s",
            "&:hover": {
              background: theme.palette.action.hover,
              borderColor: theme.palette.primary.main,
            },
          }}
        >
          Back to Grid
        </Button>
      </Box>

      {/* Section Title */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          letterSpacing: 1,
          mb: 2,
          color: theme.palette.grey[700],
        }}
      >
        Details
      </Typography>

      {/* Card with Vehicle Details */}
      <Card
        sx={{
          borderRadius: 4,
          boxShadow: "0 2px 16px 0 rgb(24 40 64 / 6%)",
          px: { xs: 2, md: 4 },
        }}
      >
        <CardContent>
          <Stack spacing={2}>
            {fields.map(
              (field) =>
                field.value && (
                  <Box
                    key={field.label}
                    display="flex"
                    alignItems="center"
                    gap={2}
                  >
                    <Typography
                      sx={{
                        minWidth: 150,
                        color: theme.palette.grey[600],
                        fontWeight: 500,
                        fontSize: 15,
                        letterSpacing: 0.5,
                        textTransform: "capitalize",
                      }}
                    >
                      {field.label}:
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: 17,
                        color: theme.palette.text.primary,
                      }}
                    >
                      {field.value}
                    </Typography>
                  </Box>
                )
            )}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default VehicleDetailsPage;
