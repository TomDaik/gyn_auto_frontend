import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Importando todos os DTOs e Modelos necessários
import { OrdemServicoCreateDTO, ItemServicoCreateDTO, ItemPecaCreateDTO } from '../models/os-create.dto';
import { OrdemServicoResponseDTO } from '../models/os-response.dto'; // Supondo que você tenha um DTO de resposta

@Injectable({
  providedIn: 'root'
})
export class OrdemServicoService {

  private readonly apiUrl = 'http://localhost:8080/api/ordens-servico';

  constructor(private http: HttpClient) { }

  criar(dto: OrdemServicoCreateDTO): Observable<OrdemServicoResponseDTO> {
    return this.http.post<OrdemServicoResponseDTO>(this.apiUrl, dto);
  }

  listar(): Observable<OrdemServicoResponseDTO[]> {
    return this.http.get<OrdemServicoResponseDTO[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<OrdemServicoResponseDTO> {
    return this.http.get<OrdemServicoResponseDTO>(`${this.apiUrl}/${id}`);
  }

  finalizar(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/finalizar`, null);
  }

  cancelar(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/cancelar`, null);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  adicionarPeca(osId: number, itemDto: ItemPecaCreateDTO): Observable<OrdemServicoResponseDTO> {
    return this.http.post<OrdemServicoResponseDTO>(`${this.apiUrl}/${osId}/pecas`, itemDto);
  }

  removerPeca(osId: number, itemPecaId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${osId}/pecas/${itemPecaId}`);
  }

  adicionarServico(osId: number, itemDto: ItemServicoCreateDTO): Observable<OrdemServicoResponseDTO> {
    return this.http.post<OrdemServicoResponseDTO>(`${this.apiUrl}/${osId}/servicos`, itemDto);
  }

  removerServico(osId: number, itemServicoId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${osId}/servicos/${itemServicoId}`);
  }
}