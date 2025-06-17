import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Funcionario } from '../../models/funcionario.model';
import { FuncionarioService } from '../../services/funcionario.service';

import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-funcionario-list',
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
  templateUrl: './funcionario-list.component.html',
  styleUrls: ['./funcionario-list.component.css']
})
export class FuncionarioListComponent implements OnInit {
  funcionarios: Funcionario[] = [];

  constructor(
    private funcionarioService: FuncionarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarFuncionarios();
  }

  carregarFuncionarios(): void {
    this.funcionarioService.listar().subscribe(data => {
      this.funcionarios = data;
    });
  }

  editarFuncionario(id: number): void {
    this.router.navigate(['/funcionario-form', id]);
  }

  excluirFuncionario(id: number): void {
    if (confirm('Tem certeza que deseja excluir este funcionário?')) {
      this.funcionarioService.excluir(id).subscribe({
        next: () => {
          alert('Funcionário excluído com sucesso!');
          this.funcionarios = this.funcionarios.filter(f => f.id !== id);
        },
        error: (err) => {
          alert('Erro ao excluir funcionário.');
          console.error(err);
        }
      });
    }
  }
}