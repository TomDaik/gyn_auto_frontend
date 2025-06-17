import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Fornecedor } from '../../models/fornecedor.model';
import { FornecedorService } from '../../services/fornecedor.service';

import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-fornecedor-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CardModule,
    TableModule,
    ButtonModule,
    ToolbarModule,
    TooltipModule
  ],
  templateUrl: './fornecedor-list.component.html',
  styleUrls: ['./fornecedor-list.component.css']
})
export class FornecedorListComponent implements OnInit {
  fornecedores: Fornecedor[] = [];

  constructor(
    private fornecedorService: FornecedorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarFornecedores();
  }

  carregarFornecedores(): void {
    this.fornecedorService.listar().subscribe(data => {
      this.fornecedores = data;
    });
  }

  editarFornecedor(id: number): void {
    this.router.navigate(['/fornecedor-form', id]);
  }

  excluirFornecedor(id: number): void {
    if (confirm('Tem certeza que deseja excluir este fornecedor?')) {
      this.fornecedorService.excluir(id).subscribe({
        next: () => {
          alert('Fornecedor excluído com sucesso!');
          this.fornecedores = this.fornecedores.filter(f => f.id !== id);
        },
        error: (err) => {
          alert('Erro ao excluir fornecedor. Verifique se ele não está associado a nenhuma peça.');
          console.error(err);
        }
      });
    }
  }
}