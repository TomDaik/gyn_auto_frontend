import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { OrdemServicoResponseDTO } from '../../models/os-response.dto';
import { OrdemServicoService } from '../../services/ordem-servico.service';

// --- IMPORTS DOS MÓDULOS DO PRIMENG ---
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { CardModule } from 'primeng/card';


@Component({
  selector: 'app-os-list',
  standalone: true,
  // Adicione os módulos do PrimeNG aqui
  imports: [
    CommonModule, 
    RouterModule, 
    TableModule, 
    ButtonModule, 
    ToolbarModule, 
    TagModule,
    TooltipModule,
    CardModule
  ],
  templateUrl: './os-list.component.html',
  styleUrls: ['./os-list.component.css']
})
export class OsListComponent implements OnInit {
  ordensDeServico: OrdemServicoResponseDTO[] = [];

  constructor(
    private osService: OrdemServicoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarOrdensDeServico();
  }

  carregarOrdensDeServico(): void {
    this.osService.listar().subscribe(data => {
      this.ordensDeServico = data;
    });
  }

  novaOS(): void {
    this.router.navigate(['/os-form']);
  }

  // <<< NOVO MÉTODO PARA EDITAR >>>
  editarOS(id: number): void {
    // Navega para o mesmo formulário, mas passando o ID
    this.router.navigate(['/os-form', id]);
  }

  finalizarOS(id: number): void {
    if (confirm('Tem certeza que deseja finalizar e marcar esta OS como PAGA?')) {
      this.osService.finalizar(id).subscribe({
        next: () => {
          alert('OS finalizada com sucesso!');
          this.carregarOrdensDeServico();
        },
        error: (err) => alert('Erro ao finalizar OS: ' + err.error.message)
      });
    }
  }

  cancelarOS(id: number): void {
    if (confirm('Tem certeza que deseja CANCELAR esta OS? As peças serão estornadas ao estoque.')) {
      this.osService.cancelar(id).subscribe({
        next: () => {
          alert('OS cancelada com sucesso!');
          this.carregarOrdensDeServico();
        },
        error: (err) => alert('Erro ao cancelar OS: ' + err.error.message)
      });
    }
  }

  /**
   * Método auxiliar para retornar uma cor (severidade) para a tag de status do PrimeNG.
   */
  getSeverity(status: 'EM_ABERTO' | 'PAGO' | 'CANCELADO'): string {
    switch (status) {
      case 'PAGO':
        return 'success';
      case 'EM_ABERTO':
        return 'warning';
      case 'CANCELADO':
        return 'danger';
      default:
        return 'info';
    }
  }
}