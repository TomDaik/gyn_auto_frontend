import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Peca } from '../../models/peca.model';
import { PecaService } from '../../services/peca.service';

import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-peca-list',
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
  templateUrl: './peca-list.component.html',
  styleUrls: ['./peca-list.component.css']
})
export class PecaListComponent implements OnInit {
  pecas: Peca[] = [];

  constructor(
    private pecaService: PecaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarPecas();
  }

  carregarPecas(): void {
    this.pecaService.listar().subscribe(data => {
      this.pecas = data;
    });
  }

  editarPeca(id: number): void {
    this.router.navigate(['/peca-form', id]);
  }

  excluirPeca(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta peça?')) {
      this.pecaService.excluir(id).subscribe({
        next: () => {
          alert('Peça excluída com sucesso!');
          this.pecas = this.pecas.filter(p => p.id !== id);
        },
        error: (err) => {
          alert('Erro ao excluir peça. Verifique se ela não está em uso em uma Ordem de Serviço.');
          console.error(err);
        }
      });
    }
  }
}