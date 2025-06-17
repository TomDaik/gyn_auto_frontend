import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

// Imports PrimeNG
import { FieldsetModule } from 'primeng/fieldset';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextarea } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

// Imports dos modelos
import { Cliente } from '../../models/cliente.model';
import { Veiculo } from '../../models/veiculo.model';
import { Servico } from '../../models/servico.model';
import { Peca } from '../../models/peca.model';
import { Funcionario } from '../../models/funcionario.model';
import { DisplayItemPeca, DisplayItemServico } from '../../models/os-form-item.model';
import { OrdemServicoCreateDTO } from '../../models/os-create.dto';

// Imports dos serviços
import { ClienteService } from '../../services/cliente.service';
import { VeiculoService } from '../../services/veiculo.service';
import { ServicoService } from '../../services/servico.service';
import { PecaService } from '../../services/peca.service';
import { FuncionarioService } from '../../services/funcionario.service';
import { OrdemServicoService } from '../../services/ordem-servico.service';

@Component({
  selector: 'app-os-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FieldsetModule,
    DropdownModule,
    InputTextarea,
    InputNumberModule,
    ButtonModule,
    TableModule,
    TagModule
  ],
  templateUrl: './os-form.component.html',
  styleUrls: ['./os-form.component.css']
})
export class OsFormComponent implements OnInit {
  // Formulários
  osForm: FormGroup;
  itemServicoForm: FormGroup;
  itemPecaForm: FormGroup;

  // Listas para popular os dropdowns
  clientes: Cliente[] = [];
  veiculosDoCliente: Veiculo[] = [];
  servicos: Servico[] = [];
  pecas: Peca[] = [];
  funcionarios: Funcionario[] = [];

  // Listas para exibir os itens adicionados na tela
  itensServicoAdicionados: DisplayItemServico[] = [];
  itensPecaAdicionados: DisplayItemPeca[] = [];

  valorTotalOS = 0.0;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private veiculoService: VeiculoService,
    private servicoService: ServicoService,
    private pecaService: PecaService,
    private funcionarioService: FuncionarioService,
    private osService: OrdemServicoService,
    private router: Router
  ) {
    this.osForm = this.fb.group({
      idCliente: [null, Validators.required],
      idVeiculo: [null, Validators.required],
      observacoes: ['']
    });

    this.itemServicoForm = this.fb.group({
      idServico: [null, Validators.required],
      idFuncionario: [null, Validators.required]
    });

    this.itemPecaForm = this.fb.group({
      idPeca: [null, Validators.required],
      quantidade: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    // Carrega os dados estáticos para os dropdowns
    this.clienteService.listar().subscribe(data => this.clientes = data);
    this.servicoService.listar().subscribe(data => this.servicos = data);
    this.pecaService.listar().subscribe(data => this.pecas = data);
    this.funcionarioService.listar().subscribe(data => this.funcionarios = data);

    // Escuta mudanças no campo de cliente para carregar os veículos dinamicamente
    this.osForm.get('idCliente')?.valueChanges.subscribe(idCliente => {
      this.veiculosDoCliente = [];
      this.osForm.get('idVeiculo')?.setValue(null);
      if (idCliente) {
        this.veiculoService.listar().subscribe(todosVeiculos => {
            this.veiculosDoCliente = todosVeiculos.filter(v => v.proprietario.id == idCliente);
        });
      }
    });
  }

  adicionarServico(): void {
    if (this.itemServicoForm.invalid) return;

    const idServico = this.itemServicoForm.value.idServico;
    const idFuncionario = this.itemServicoForm.value.idFuncionario;

    const servico = this.servicos.find(s => s.id == idServico);
    const funcionario = this.funcionarios.find(f => f.id == idFuncionario);

    if (servico && funcionario) {
      this.itensServicoAdicionados.push({
        idServico: servico.id,
        descricaoServico: servico.descricao,
        idFuncionario: funcionario.id,
        nomeFuncionario: funcionario.nome,
        valor: servico.valorUnitario
      });
      this.itemServicoForm.reset();
      this.atualizarValorTotal();
    }
  }

  removerServico(index: number): void {
    this.itensServicoAdicionados.splice(index, 1);
    this.atualizarValorTotal();
  }

  adicionarPeca(): void {
    if (this.itemPecaForm.invalid) return;

    const idPeca = this.itemPecaForm.value.idPeca;
    const quantidade = this.itemPecaForm.value.quantidade;
    const peca = this.pecas.find(p => p.id == idPeca);

    if (peca) {
      this.itensPecaAdicionados.push({
        idPeca: peca.id,
        descricaoPeca: peca.descricao,
        quantidade: quantidade,
        valorUnitario: peca.valorUnitario,
        valorTotal: peca.valorUnitario * quantidade
      });
      this.itemPecaForm.reset({ quantidade: 1 });
      this.atualizarValorTotal();
    }
  }

  removerPeca(index: number): void {
    this.itensPecaAdicionados.splice(index, 1);
    this.atualizarValorTotal();
  }

  atualizarValorTotal(): void {
    const totalServicos = this.itensServicoAdicionados.reduce((sum, item) => sum + item.valor, 0);
    const totalPecas = this.itensPecaAdicionados.reduce((sum, item) => sum + item.valorTotal, 0);
    this.valorTotalOS = totalServicos + totalPecas;
  }

  salvarOS(): void {
    if (this.osForm.invalid) {
      alert('Selecione o Cliente e o Veículo.');
      return;
    }
    if (this.itensServicoAdicionados.length === 0 && this.itensPecaAdicionados.length === 0) {
      alert('Adicione pelo menos uma peça ou serviço à Ordem de Serviço.');
      return;
    }

    const dto: OrdemServicoCreateDTO = {
      ...this.osForm.value,
      servicos: this.itensServicoAdicionados.map(item => ({ idServico: item.idServico, idFuncionario: item.idFuncionario })),
      pecas: this.itensPecaAdicionados.map(item => ({ idPeca: item.idPeca, quantidade: item.quantidade }))
    };

    this.osService.criar(dto).subscribe({
      next: () => {
        alert('Ordem de Serviço criada com sucesso!');
        this.router.navigate(['/os-list']); // Navegue para a lista de OS
      },
      error: (err) => {
        alert('Erro ao criar Ordem de Serviço: ' + (err.error?.message || 'Verifique o console'));
        console.error(err);
      }
    });
  }
}