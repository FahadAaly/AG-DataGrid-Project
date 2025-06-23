import { AppTypography } from "@/components/ui/AppTypography";
import DataGrid from "@/features/dataGrid/DataGrid";
import { Container } from "@mui/material";

const Home = () => (
  <Container maxWidth="lg">
    <AppTypography variant="h4" gutterBottom sx={{ my: 3 }}>
      Generic Data Grid
    </AppTypography>
    <DataGrid />
  </Container>
);

export default Home;
