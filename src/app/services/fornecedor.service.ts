import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fornecedor } from '../models/fornecedor.model';
import { FornecedorCreateDTO } from '../models/fornecedor-create.dto';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  private readonly apiUrl = 'http://localhost:8080/api/fornecedores';

  constructor(private http: HttpClient) { }

  listar(): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Fornecedor> {
    return this.http.get<Fornecedor>(`${this.apiUrl}/${id}`);
  }

  criar(dto: FornecedorCreateDTO): Observable<Fornecedor> {
    return this.http.post<Fornecedor>(this.apiUrl, dto);
  }

  atualizar(id: number, dto: FornecedorCreateDTO): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, dto);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}