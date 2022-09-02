export interface VeiculoDados extends Array<VeiculoDado> {}

export interface VeiculoDado {
  id: number | string;
  VIN: string;
  Odometer: number | string;
  Tire_Pressure: Array<number> | string;
  Vehicle_Status: string;
  Battery_Status: string;
  Fuel_Level: number | string;
  Latitude: number | string;
  Longitude: number | string;
}

export interface VeiculosDadosAPI {
  vehicleData: VeiculoDados;
}
