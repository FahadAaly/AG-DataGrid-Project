import { RequestHandler } from "express";
import { VehicleModel } from "../models/Vehicle";

export const getVehicles: RequestHandler = async (req, res) => {
  // Multi-filter support
  let filters: Array<{ field: string; type: string; value: string }> = [];
  if (req.query.filters) {
    try {
      filters = JSON.parse(req.query.filters as string);
    } catch {
      filters = [];
    }
  }
  const search = req.query.search;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;

  let query: any = {};

  if (search) query.$text = { $search: search as string };

  for (const filter of filters) {
    const { field, type, value } = filter;
    switch (type) {
      case "equals":
        query[field] = value;
        break;
      case "contains":
        query[field] = { $regex: value, $options: "i" };
        break;
      case "starts":
        query[field] = { $regex: `^${value}`, $options: "i" };
        break;
      case "ends":
        query[field] = { $regex: `${value}$`, $options: "i" };
        break;
      case "empty":
        query[field] = { $in: [null, ""] };
        break;
    }
  }

  const skip = (page - 1) * limit;
  const [vehicles, total] = await Promise.all([
    VehicleModel.find(query).skip(skip).limit(limit),
    VehicleModel.countDocuments(query),
  ]);

  res.json({
    data: vehicles,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
};

export const getVehicle: RequestHandler = async (req, res) => {
  const record = await VehicleModel.findById(req.params.id);
  res.json(record);
};

export const deleteVehicle: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await VehicleModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted" });
  } catch (e) {
    res.status(500).json({ message: "Delete failed" });
  }
};
