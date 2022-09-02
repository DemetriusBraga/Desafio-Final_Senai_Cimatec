export interface Veiculos extends Array<Veiculo> {}

export interface Veiculo {
  id: number | string;
  Model: string;
  Volume_Total: number;
  Connected: number;
  Software_Updates: number;
}

export interface VeiculosAPI {
  vehicles: Veiculos;
}
