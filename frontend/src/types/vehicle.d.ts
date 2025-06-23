export interface Vehicle {
  _id: string;
  Brand: string;
  Model: string;
  PriceEuro: string;
  [key: string]: any;
}

export interface VehicleSearchParams {
  search?: string;
  filterField?: string;
  filterValue?: string;
  filterType?: "equals" | "contains" | "starts" | "ends" | "empty";
}
