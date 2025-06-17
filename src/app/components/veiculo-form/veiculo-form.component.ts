import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { VeiculoService } from '../../services/veiculo.service';
import { VeiculoCreateDTO } from '../../models/veiculo-create.dto';
import { Cliente } from '../../models/cliente.model';
import { ClienteService } from '../../services/cliente.service';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-veiculo-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    CardModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    DropdownModule
  ],
  templateUrl: './veiculo-form.component.html',
  styleUrls: ['./veiculo-form.component.css']
})
export class VeiculoFormComponent implements OnInit {
  form: FormGroup;
  isEditMode = false;
  veiculoId: number | null = null;
  clientes: Cliente[] = []; // Lista para popular o select de proprietários

  constructor(
    private fb: FormBuilder,
    private veiculoService: VeiculoService,
    private clienteService: ClienteService, // Injetamos o serviço de cliente
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      ano: [null, [Validators.required, Validators.min(1950)]],
      placa: ['', Validators.required],
      quilometragem: [null, [Validators.required, Validators.min(0)]],
      idProprietario: [null, Validators.required] // Campo para o ID do proprietário
    });
  }

  ngOnInit(): void {
    this.carregarClientes(); // Carrega os clientes para o dropdown

    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.isEditMode = true;
        this.veiculoId = parseInt(idParam, 10);
        this.carregarDadosVeiculo(this.veiculoId);
      }
    });
  }

  carregarClientes(): void {
    this.clienteService.listar().subscribe(data => {
      this.clientes = data;
    });
  }

  carregarDadosVeiculo(id: number): void {
    this.veiculoService.buscarPorId(id).subscribe(veiculo => {
      // Usamos patchValue para preencher o formulário
      this.form.patchValue({
        ...veiculo,
        idProprietario: veiculo.proprietario.id // Preenche o select com o ID correto
      });
    });
  }

  salvar(): void {
    if (this.form.invalid) {
      alert('Formulário inválido. Por favor, verifique os campos.');
      return;
    }

    const veiculoData: VeiculoCreateDTO = this.form.value;
    let operation: Observable<any>;

    if (this.isEditMode && this.veiculoId) {
      operation = this.veiculoService.atualizar(this.veiculoId, veiculoData);
    } else {
      operation = this.veiculoService.criar(veiculoData);
    }
      
    const successMessage = this.isEditMode ? 'Veículo atualizado com sucesso!' : 'Veículo cadastrado com sucesso!';

    operation.subscribe({
      next: () => {
        alert(successMessage);
        this.router.navigate(['/veiculo-list']);
      },
      error: (err) => {
        const errorMessage = err.error?.message || 'Verifique o console.';
        alert('Ocorreu um erro: ' + errorMessage);
        console.error('Erro ao salvar veículo', err);
      }
    });
  }
}