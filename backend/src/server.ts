import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/db";
import vehicleRoutes from "./routes/vehicle.routes";
import { errorMiddleware } from "./middleware/error.middleware";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/vehicles", vehicleRoutes);
app.use(errorMiddleware);

const PORT = process.env.PORT || 5001;
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  throw new Error("MONGO_URI environment variable is not defined");
}
connectDB(mongoUri).then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 API ready at http://localhost:${PORT}`);
  });
});
