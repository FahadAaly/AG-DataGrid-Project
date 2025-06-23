import { Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import VehicleDetailsPage from "@/pages/VehicleDetailsPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route>
        <Route path="/" element={<Home />} />
        <Route path="/vehicle/:id" element={<VehicleDetailsPage />} />
      </Route>
    </Routes>
  );
}
