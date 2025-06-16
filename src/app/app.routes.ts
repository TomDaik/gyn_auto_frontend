import { Routes } from '@angular/router';

// Importe os componentes com seus nomes corretos (geralmente terminam com 'Component')
import { ClienteListComponent } from './components/cliente-list/cliente-list.component';
import { FornecedorListComponent } from './components/fornecedor-list/fornecedor-list.component';
import { FuncionarioListComponent } from './components/funcionario-list/funcionario-list.component'; // Corrigido aqui
import { OsFormComponent } from './components/os-form/os-form.component';
import { OsListComponent } from './components/os-list/os-list.component';
import { PecaListComponent } from './components/peca-list/peca-list.component';
import { ServicoListComponent } from './components/servico-list/servico-list.component';
import { VeiculoListComponent } from './components/veiculo-list/veiculo-list.component';


export const routes: Routes = [
  // Use os nomes corrigidos dos componentes aqui também
  { path: 'cliente-list', component: ClienteListComponent },
  { path: 'fornecedor-list', component: FornecedorListComponent },
  { path: 'funcionario-list', component: FuncionarioListComponent }, // Corrigido aqui
  { path: 'os-form', component: OsFormComponent },
  { path: 'os-list', component: OsListComponent },
  { path: 'peca-list', component: PecaListComponent },
  { path: 'servico-list', component: ServicoListComponent },
  { path: 'veiculos-list', component: VeiculoListComponent },
  { path: '', redirectTo: '/os-list', pathMatch: 'full' },
];