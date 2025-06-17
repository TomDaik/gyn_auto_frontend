import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { ClienteService } from '../../services/cliente.service';
import { ClienteCreateDTO } from '../../models/cliente-create.dto';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    CalendarModule,
    InputMaskModule], 
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit {
  
  form: FormGroup;
  isEditMode = false;
  clienteId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/)]],
      dataNascimento: ['', Validators.required],
      endereco: ['', Validators.required],
      telefone: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.isEditMode = true;
        this.clienteId = parseInt(idParam, 10);
        this.carregarDadosCliente(this.clienteId);
      }
    });
  }

  carregarDadosCliente(id: number): void {
    this.clienteService.buscarPorId(id).subscribe(cliente => {

      this.form.patchValue(cliente);
    });
  }

  salvar(): void {
    if (this.form.invalid) {
      alert('Formulário inválido. Por favor, verifique todos os campos.');
      return;
    }

    const clienteData: ClienteCreateDTO = this.form.value;

    let operation: Observable<any>;

    if (this.isEditMode && this.clienteId) {
      operation = this.clienteService.atualizar(this.clienteId, clienteData);
    } else {
      operation = this.clienteService.criar(clienteData);
    }
      
    const successMessage = this.isEditMode ? 'Cliente atualizado com sucesso!' : 'Cliente cadastrado com sucesso!';

    operation.subscribe({
      next: () => {
        alert(successMessage);
        this.router.navigate(['/cliente-list']);
      },
      error: (err) => {
        const errorMessage = err.error?.message || 'Verifique o console para mais detalhes.';
        alert('Ocorreu um erro: ' + errorMessage);
        console.error('Erro ao salvar cliente', err);
      }
    });
  }
}