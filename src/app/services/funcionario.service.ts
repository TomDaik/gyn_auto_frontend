import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Funcionario } from '../models/funcionario.model';
import { FuncionarioCreateDTO } from '../models/funcionario-create.dto';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  private readonly apiUrl = 'http://localhost:8080/api/funcionarios';

  constructor(private http: HttpClient) { }

  listar(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Funcionario> {
    return this.http.get<Funcionario>(`${this.apiUrl}/${id}`);
  }

  criar(dto: FuncionarioCreateDTO): Observable<Funcionario> {
    return this.http.post<Funcionario>(this.apiUrl, dto);
  }

  atualizar(id: number, dto: FuncionarioCreateDTO): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, dto);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}