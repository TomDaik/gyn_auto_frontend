import { Cliente } from './cliente.model';

// Interface para um item de serviço na resposta
interface ItemServicoResponse {
  servicoDescricao: string;
  valorCobrado: number;
  funcionarioNome: string;
}

// Interface para um item de peça na resposta
interface ItemPecaResponse {
  pecaDescricao: string;
  quantidade: number;
  valorUnitarioCobrado: number;
  valorTotalItem: number;
}

// O DTO de resposta principal e detalhado para uma Ordem de Serviço
export interface OrdemServicoResponseDTO {
  id: number;
  dataAbertura: string;
  dataFechamento: string | null;
  status: 'EM_ABERTO' | 'PAGO' | 'CANCELADO'; // Tipagem para os status
  observacoes: string;
  valorTotal: number;
  cliente: Cliente;
  veiculo: { // Objeto aninhado para o veículo
    idVeiculo: number;
    placa: string;
    modelo: string;
  };
  itensServico: ItemServicoResponse[];
  itensPeca: ItemPecaResponse[];
}