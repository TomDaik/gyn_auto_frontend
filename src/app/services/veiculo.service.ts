import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Veiculo } from '../models/veiculo.model';
import { VeiculoCreateDTO } from '../models/veiculo-create.dto';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {

  private readonly apiUrl = 'http://localhost:8080/api/veiculos';

  constructor(private http: HttpClient) { }

  listar(): Observable<Veiculo[]> {
    return this.http.get<Veiculo[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Veiculo> {
    return this.http.get<Veiculo>(`${this.apiUrl}/${id}`);
  }

  criar(dto: VeiculoCreateDTO): Observable<Veiculo> {
    return this.http.post<Veiculo>(this.apiUrl, dto);
  }

  atualizar(id: number, dto: VeiculoCreateDTO): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, dto);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}