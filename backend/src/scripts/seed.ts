import mongoose from "mongoose";
import csv from "csvtojson";
import { VehicleModel } from "../models/Vehicle";

const MONGO_URI =
  "mongodb+srv://root:pass123@cluster0.dikk7xz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const CSV_FILE = "../data/ElectricCarData.csv";

async function seed() {
  await mongoose.connect(MONGO_URI);
  const jsonArray = await csv().fromFile(CSV_FILE);

  // Remove all previous
  await VehicleModel.deleteMany({});
  // Insert all new
  await VehicleModel.insertMany(jsonArray);
  console.log(`Seeded ${jsonArray.length} records!`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
