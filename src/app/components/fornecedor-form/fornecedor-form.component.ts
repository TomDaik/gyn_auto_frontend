import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { FornecedorService } from '../../services/fornecedor.service';
import { FornecedorCreateDTO } from '../../models/fornecedor-create.dto';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
  selector: 'app-fornecedor-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    InputMaskModule
  ],
  templateUrl: './fornecedor-form.component.html',
  styleUrls: ['./fornecedor-form.component.css']
})
export class FornecedorFormComponent implements OnInit {
  form: FormGroup;
  isEditMode = false;
  fornecedorId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private fornecedorService: FornecedorService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required], // Nome Fantasia
      razaoSocial: ['', Validators.required],
      cnpj: ['', [Validators.required, Validators.pattern(/^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}$/)]],
      endereco: ['', Validators.required],
      telefone: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.isEditMode = true;
        this.fornecedorId = parseInt(idParam, 10);
        this.carregarDadosFornecedor(this.fornecedorId);
      }
    });
  }

  carregarDadosFornecedor(id: number): void {
    this.fornecedorService.buscarPorId(id).subscribe(fornecedor => {
      this.form.patchValue(fornecedor);
    });
  }

  salvar(): void {
    if (this.form.invalid) {
      alert('Formulário inválido. Por favor, verifique os campos.');
      return;
    }

    const fornecedorData: FornecedorCreateDTO = this.form.value;
    let operation: Observable<any>;

    if (this.isEditMode && this.fornecedorId) {
      operation = this.fornecedorService.atualizar(this.fornecedorId, fornecedorData);
    } else {
      operation = this.fornecedorService.criar(fornecedorData);
    }
      
    const successMessage = this.isEditMode ? 'Fornecedor atualizado com sucesso!' : 'Fornecedor cadastrado com sucesso!';

    operation.subscribe({
      next: () => {
        alert(successMessage);
        this.router.navigate(['/fornecedor-list']);
      },
      error: (err) => {
        const errorMessage = err.error?.message || 'Verifique o console.';
        alert('Ocorreu um erro: ' + errorMessage);
        console.error('Erro ao salvar fornecedor', err);
      }
    });
  }
}