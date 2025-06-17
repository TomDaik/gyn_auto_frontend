export interface DisplayItemServico {
    idServico: number;
    descricaoServico: string;
    idFuncionario: number;
    nomeFuncionario: string;
    valor: number;
}
  
export interface DisplayItemPeca {
    idPeca: number;
    descricaoPeca: string;
    quantidade: number;
    valorUnitario: number;
    valorTotal: number;
}