
// DTO para um item de serviço individual
export interface ItemServicoCreateDTO {
    idServico: number;
    idFuncionario: number;
}
  
// DTO para um item de peça individual
export interface ItemPecaCreateDTO {
    idPeca: number;
    quantidade: number;
}
  
// O DTO principal que será enviado para o backend
export interface OrdemServicoCreateDTO {
    idCliente: number;
    idVeiculo: number;
    observacoes: string;
    servicos: ItemServicoCreateDTO[];
    pecas: ItemPecaCreateDTO[];
}