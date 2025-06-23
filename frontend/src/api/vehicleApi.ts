import { get, post, put, del } from "@/lib/fetcher";
import { Vehicle, VehicleSearchParams } from "@/types/vehicle";

const URL = "api/vehicles";

export const fetchVehicleById = (id: string) => get<Vehicle>(`${URL}/${id}`);

export const createVehicle = (payload: Partial<Vehicle>) =>
  post<Vehicle, Partial<Vehicle>>(URL, payload);

export const updateVehicle = (id: string, payload: Partial<Vehicle>) =>
  put<Vehicle, Partial<Vehicle>>(`${URL}/${id}`, payload);

export const deleteVehicle = (id: string) => del<void>(`${URL}/${id}`);
