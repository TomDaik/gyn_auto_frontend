import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Cliente } from '../../models/cliente.model';
import { ClienteService } from '../../services/cliente.service';

import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-cliente-list',
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
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {
  clientes: Cliente[] = [];

  constructor(
    private clienteService: ClienteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarClientes();
  }

  carregarClientes(): void {
    this.clienteService.listar().subscribe(data => {
      this.clientes = data;
    });
  }

  editarCliente(id: number): void {
    this.router.navigate(['/cliente-form', id]);
  }

  excluirCliente(id: number): void {
    if (confirm('Tem certeza que deseja excluir este cliente? \nEsta ação não pode ser desfeita.')) {
      this.clienteService.excluir(id).subscribe({
        next: () => {
          alert('Cliente excluído com sucesso!');
          // Remove o cliente da lista local para uma atualização instantânea da tela
          this.clientes = this.clientes.filter(cliente => cliente.id !== id);
        },
        error: (err) => {
          alert('Erro ao excluir cliente. Verifique o console para mais detalhes.');
          console.error('Erro ao excluir cliente:', err);
        }
      });
    }
  }
}