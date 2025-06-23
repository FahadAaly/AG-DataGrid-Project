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
connectDB(
  process.env.MONGO_URI ||
    "mongodb+srv://root:pass123@cluster0.dikk7xz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
).then(() => {
  app.listen(PORT, () =>
    console.log(`🚀 API ready at http://localhost:${PORT}`)
  );
});
