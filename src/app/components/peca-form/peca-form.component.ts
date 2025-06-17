import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { PecaService } from '../../services/peca.service';
import { PecaCreateDTO } from '../../models/peca-create.dto';
import { Fornecedor } from '../../models/fornecedor.model';
import { FornecedorService } from '../../services/fornecedor.service';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'app-peca-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    CardModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    MultiSelectModule
  ],
  templateUrl: './peca-form.component.html',
  styleUrls: ['./peca-form.component.css']
})
export class PecaFormComponent implements OnInit {
  form: FormGroup;
  isEditMode = false;
  pecaId: number | null = null;
  fornecedores: Fornecedor[] = [];

  constructor(
    private fb: FormBuilder,
    private pecaService: PecaService,
    private fornecedorService: FornecedorService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      codigo: ['', Validators.required],
      descricao: ['', Validators.required],
      tipo: [''],
      valorUnitario: [null, [Validators.required, Validators.min(0)]],
      quantidade: [null, [Validators.required, Validators.min(0)]],
      idsFornecedores: [[]]
    });
  }

  ngOnInit(): void {
    this.carregarFornecedores();
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.isEditMode = true;
        this.pecaId = parseInt(idParam, 10);
        this.carregarDadosPeca(this.pecaId);
      }
    });
  }

  carregarFornecedores(): void {
    this.fornecedorService.listar().subscribe(data => {
      this.fornecedores = data;
    });
  }

  carregarDadosPeca(id: number): void {
    this.pecaService.buscarPorId(id).subscribe(peca => {
      const idsFornecedores = peca.fornecedores.map(f => f.id);
      this.form.patchValue({
        ...peca,
        idsFornecedores: idsFornecedores
      });
    });
  }

  salvar(): void {
    if (this.form.invalid) {
      alert('Formulário inválido. Por favor, verifique os campos.');
      return;
    }

    const pecaData: PecaCreateDTO = this.form.value;
    let operation: Observable<any>;

    if (this.isEditMode && this.pecaId) {
      operation = this.pecaService.atualizar(this.pecaId, pecaData);
    } else {
      operation = this.pecaService.criar(pecaData);
    }
      
    const successMessage = this.isEditMode ? 'Peça atualizada com sucesso!' : 'Peça cadastrada com sucesso!';

    operation.subscribe({
      next: () => {
        alert(successMessage);
        this.router.navigate(['/peca-list']);
      },
      error: (err) => {
        const errorMessage = err.error?.message || 'Verifique o console.';
        alert('Ocorreu um erro: ' + errorMessage);
        console.error('Erro ao salvar peça', err);
      }
    });
  }
}