import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { FuncionarioService } from '../../services/funcionario.service';
import { FuncionarioCreateDTO } from '../../models/funcionario-create.dto';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-funcionario-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    CalendarModule,
    InputMaskModule,
    InputNumberModule,
    DividerModule
  ],
  templateUrl: './funcionario-form.component.html',
  styleUrls: ['./funcionario-form.component.css']
})
export class FuncionarioFormComponent implements OnInit {
  form: FormGroup;
  isEditMode = false;
  funcionarioId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private funcionarioService: FuncionarioService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/)]],
      dataNascimento: ['', Validators.required],
      endereco: ['', Validators.required],
      telefone: ['', Validators.required],
      cargo: ['', Validators.required],
      salario: [null, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.isEditMode = true;
        this.funcionarioId = parseInt(idParam, 10);
        this.carregarDadosFuncionario(this.funcionarioId);
      }
    });
  }

  carregarDadosFuncionario(id: number): void {
    this.funcionarioService.buscarPorId(id).subscribe(funcionario => {
      this.form.patchValue(funcionario);
    });
  }

  salvar(): void {
    if (this.form.invalid) {
      alert('Formulário inválido. Por favor, verifique os campos.');
      return;
    }

    const funcionarioData: FuncionarioCreateDTO = this.form.value;
    let operation: Observable<any>;

    if (this.isEditMode && this.funcionarioId) {
      operation = this.funcionarioService.atualizar(this.funcionarioId, funcionarioData);
    } else {
      operation = this.funcionarioService.criar(funcionarioData);
    }
      
    const successMessage = this.isEditMode ? 'Funcionário atualizado com sucesso!' : 'Funcionário cadastrado com sucesso!';

    operation.subscribe({
      next: () => {
        alert(successMessage);
        this.router.navigate(['/funcionario-list']);
      },
      error: (err) => {
        const errorMessage = err.error?.message || 'Verifique o console.';
        alert('Ocorreu um erro: ' + errorMessage);
        console.error('Erro ao salvar funcionário', err);
      }
    });
  }
}