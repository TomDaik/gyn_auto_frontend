import { Fornecedor } from "./fornecedor.model";

export interface Peca {
  id: number;
  codigo: string;
  descricao: string;
  tipo: string;
  valorUnitario: number;
  quantidade: number;
  fornecedores: Fornecedor[];
}