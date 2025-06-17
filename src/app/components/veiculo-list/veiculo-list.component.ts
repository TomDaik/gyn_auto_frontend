import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Veiculo } from '../../models/veiculo.model';
import { VeiculoService } from '../../services/veiculo.service';

import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-veiculo-list',
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
  templateUrl: './veiculo-list.component.html',
  styleUrls: ['./veiculo-list.component.css']
})
export class VeiculoListComponent implements OnInit {
  veiculos: Veiculo[] = [];

  constructor(
    private veiculoService: VeiculoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarVeiculos();
  }

  carregarVeiculos(): void {
    this.veiculoService.listar().subscribe(data => {
      this.veiculos = data;
    });
  }

  editarVeiculo(id: number): void {
    this.router.navigate(['/veiculo-form', id]);
  }

  excluirVeiculo(id: number): void {
    if (confirm('Tem certeza que deseja excluir este veículo?')) {
      this.veiculoService.excluir(id).subscribe({
        next: () => {
          alert('Veículo excluído com sucesso!');
          this.veiculos = this.veiculos.filter(v => v.idVeiculo !== id);
        },
        error: (err) => {
          alert('Erro ao excluir veículo. Verifique se ele não está em uso em uma Ordem de Serviço.');
          console.error(err);
        }
      });
    }
  }
}