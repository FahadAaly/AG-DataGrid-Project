import { Schema, model } from "mongoose";
import { Vehicle } from "../dto/vehicle.dto";

const VehicleSchema = new Schema<Vehicle>(
  {},
  { strict: false, timestamps: true }
);
const textIndex: Record<string, any> = {};
["Brand", "Model", "Engine", "Type"].forEach((f) => (textIndex[f] = "text"));
VehicleSchema.index(textIndex);
export const VehicleModel = model<Vehicle>("Vehicles", VehicleSchema);
