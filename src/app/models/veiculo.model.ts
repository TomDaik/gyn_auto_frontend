import { Cliente } from "./cliente.model";

export interface Veiculo {
  idVeiculo: number;
  marca: string;
  modelo: string;
  ano: number;
  placa: string;
  quilometragem: number;
  proprietario: Cliente;
}