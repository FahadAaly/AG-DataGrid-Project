import mongoose from "mongoose";
import csv from "csvtojson";
import { VehicleModel } from "../models/Vehicle";
import "dotenv/config";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("MONGO_URI environment variable is not defined");
}

const CSV_FILE = "../data/ElectricCarData.csv";

async function seed() {
  await mongoose.connect(MONGO_URI!);
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
