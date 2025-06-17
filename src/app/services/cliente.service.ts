import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';
import { ClienteCreateDTO } from '../models/cliente-create.dto';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly apiUrl = 'http://localhost:8080/api/clientes';

  constructor(private http: HttpClient) { }

  /** Busca a lista de todos os Clientes. */
  listar(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  /** Busca um único Cliente pelo seu ID. */
  buscarPorId(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
  }

  /** Cria um novo Cliente. */
  criar(dto: ClienteCreateDTO): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, dto);
  }

  /** Atualiza um Cliente existente. */
  atualizar(id: number, dto: ClienteCreateDTO): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, dto);
  }

  /** Exclui um Cliente. */
  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}