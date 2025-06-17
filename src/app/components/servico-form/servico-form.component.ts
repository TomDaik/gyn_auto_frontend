import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { ServicoService } from '../../services/servico.service';
import { ServicoCreateDTO } from '../../models/servico-create.dto';

import { CardModule } from 'primeng/card';
import { InputTextarea } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-servico-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    RouterModule,
    CardModule,
    InputTextarea,
    InputNumberModule,
    ButtonModule
  ],
  templateUrl: './servico-form.component.html',
  styleUrls: ['./servico-form.component.css']
})
export class ServicoFormComponent implements OnInit {
  form: FormGroup;
  isEditMode = false;
  servicoId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private servicoService: ServicoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      descricao: ['', Validators.required],
      valorUnitario: [null, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.isEditMode = true;
        this.servicoId = parseInt(idParam, 10);
        this.carregarDadosServico(this.servicoId);
      }
    });
  }

  carregarDadosServico(id: number): void {
    this.servicoService.buscarPorId(id).subscribe(servico => {
      this.form.patchValue(servico);
    });
  }

  salvar(): void {
    if (this.form.invalid) {
      alert('Formulário inválido. Por favor, verifique os campos.');
      return;
    }

    const servicoData: ServicoCreateDTO = this.form.value;
    let operation: Observable<any>;

    if (this.isEditMode && this.servicoId) {
      operation = this.servicoService.atualizar(this.servicoId, servicoData);
    } else {
      operation = this.servicoService.criar(servicoData);
    }
      
    const successMessage = this.isEditMode ? 'Serviço atualizado com sucesso!' : 'Serviço cadastrado com sucesso!';

    operation.subscribe({
      next: () => {
        alert(successMessage);
        this.router.navigate(['/servico-list']);
      },
      error: (err) => {
        const errorMessage = err.error?.message || 'Verifique o console.';
        alert('Ocorreu um erro: ' + errorMessage);
        console.error('Erro ao salvar serviço', err);
      }
    });
  }
}