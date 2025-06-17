import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Peca } from '../models/peca.model';
import { PecaCreateDTO } from '../models/peca-create.dto';

@Injectable({
  providedIn: 'root'
})
export class PecaService {

  private readonly apiUrl = 'http://localhost:8080/api/pecas';

  constructor(private http: HttpClient) { }

  listar(): Observable<Peca[]> {
    return this.http.get<Peca[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Peca> {
    return this.http.get<Peca>(`${this.apiUrl}/${id}`);
  }

  criar(dto: PecaCreateDTO): Observable<Peca> {
    return this.http.post<Peca>(this.apiUrl, dto);
  }

  atualizar(id: number, dto: PecaCreateDTO): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, dto);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}