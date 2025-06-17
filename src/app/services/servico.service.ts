import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Servico } from '../models/servico.model';
import { ServicoCreateDTO } from '../models/servico-create.dto';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  private readonly apiUrl = 'http://localhost:8080/api/servicos';

  constructor(private http: HttpClient) { }

  listar(): Observable<Servico[]> {
    return this.http.get<Servico[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Servico> {
    return this.http.get<Servico>(`${this.apiUrl}/${id}`);
  }

  criar(dto: ServicoCreateDTO): Observable<Servico> {
    return this.http.post<Servico>(this.apiUrl, dto);
  }

  atualizar(id: number, dto: ServicoCreateDTO): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, dto);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}