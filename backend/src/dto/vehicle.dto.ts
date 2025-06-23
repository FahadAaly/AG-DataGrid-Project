export interface Vehicle {
  _id?: string;
  name: string;
  email: string;
}

export interface VehicleSearchParams {
  search?: string;
  filterField?: string;
  filterValue?: string;
  filterType?: "equals" | "contains" | "starts" | "ends" | "empty";
}
