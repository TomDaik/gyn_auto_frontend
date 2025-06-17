import { Routes } from '@angular/router';

import { LayoutComponent } from './components/layout/layout.component';
import { ClienteListComponent } from './components/cliente-list/cliente-list.component';
import { ClienteFormComponent } from './components/cliente-form/cliente-form.component';
import { FornecedorListComponent } from './components/fornecedor-list/fornecedor-list.component';
import { FornecedorFormComponent } from './components/fornecedor-form/fornecedor-form.component';
import { FuncionarioListComponent } from './components/funcionario-list/funcionario-list.component';
import { FuncionarioFormComponent } from './components/funcionario-form/funcionario-form.component'; // Corrigido aqui
import { OsFormComponent } from './components/os-form/os-form.component';
import { OsListComponent } from './components/os-list/os-list.component';
import { PecaListComponent } from './components/peca-list/peca-list.component';
import { PecaFormComponent } from './components/peca-form/peca-form.component';
import { ServicoListComponent } from './components/servico-list/servico-list.component';
import { ServicoFormComponent } from './components/servico-form/servico-form.component';
import { VeiculoListComponent } from './components/veiculo-list/veiculo-list.component';
import { VeiculoFormComponent } from './components/veiculo-form/veiculo-form.component';


export const routes: Routes = [
  // Use os nomes corrigidos dos componentes aqui também
  {
    path: '',
    component: LayoutComponent, // O LayoutComponent é a rota principal
    children: [
      { path: 'cliente-list', component: ClienteListComponent },
      { path: 'cliente-form', component: ClienteFormComponent },
      { path: 'cliente-form/:id', component: ClienteFormComponent },
      { path: 'fornecedor-list', component: FornecedorListComponent },
      { path: 'fornecedor-form', component: FornecedorFormComponent },
      { path: 'fornecedor-form/:id', component: FornecedorFormComponent },
      { path: 'funcionario-list', component: FuncionarioListComponent },
      { path: 'funcionario-form', component: FuncionarioFormComponent },
      { path: 'funcionario-form/:id', component: FuncionarioFormComponent },
      { path: 'os-form', component: OsFormComponent },
      { path: 'os-list', component: OsListComponent },
      { path: 'peca-list', component: PecaListComponent },
      { path: 'peca-form', component: PecaFormComponent },
      { path: 'peca-form/:id', component: PecaFormComponent },
      { path: 'servico-list', component: ServicoListComponent },
      { path: 'servico-form', component: ServicoFormComponent },
      { path: 'servico-form/:id', component: ServicoFormComponent },
      { path: 'veiculo-list', component: VeiculoListComponent },
      { path: 'veiculo-form', component: VeiculoFormComponent },
      { path: 'veiculo-form/:id', component: VeiculoFormComponent },
      { path: '', redirectTo: '/os-list', pathMatch: 'full' },
    ]  
  }
];