export interface PecaCreateDTO {
    codigo: string;
    descricao: string;
    tipo: string;
    valorUnitario: number;
    quantidade: number;
    idsFornecedores: number[]; // Apenas uma lista de IDs dos fornecedores
  }