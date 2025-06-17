import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Servico } from '../../models/servico.model';
import { ServicoService } from '../../services/servico.service';

@Component({
  selector: 'app-servico-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './servico-list.component.html',
  styleUrls: ['./servico-list.component.css']
})
export class ServicoListComponent implements OnInit {
  servicos: Servico[] = [];

  constructor(
    private servicoService: ServicoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarServicos();
  }

  carregarServicos(): void {
    this.servicoService.listar().subscribe(data => {
      this.servicos = data;
    });
  }

  editarServico(id: number): void {
    this.router.navigate(['/servico-form', id]);
  }

  excluirServico(id: number): void {
    if (confirm('Tem certeza que deseja excluir este serviço?')) {
      this.servicoService.excluir(id).subscribe({
        next: () => {
          alert('Serviço excluído com sucesso!');
          this.servicos = this.servicos.filter(s => s.id !== id);
        },
        error: (err) => {
          alert('Erro ao excluir serviço. Verifique se ele não está em uso em uma Ordem de Serviço.');
          console.error(err);
        }
      });
    }
  }
}