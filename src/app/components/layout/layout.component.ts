// Salve em: src/app/layout/layout.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api'; // 1. Importe o MenuItem

// 2. Importe os módulos dos componentes PrimeNG que vamos usar
import { PanelMenuModule } from 'primeng/panelmenu';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-layout',
  standalone: true,
  // 3. Adicione os módulos do PrimeNG aos imports do componente
  imports: [CommonModule, RouterModule, RouterOutlet, PanelMenuModule, ToolbarModule, ButtonModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  // 4. Crie a propriedade para guardar a estrutura do menu
  menuItems: MenuItem[] = [];

  ngOnInit(): void {
    // 5. Preencha a estrutura do menu quando o componente iniciar
    this.menuItems = [
      {
        label: 'Ordem de Serviço',
        icon: 'pi pi-fw pi-file-edit',
        items: [
          { label: 'Nova OS', icon: 'pi pi-fw pi-plus', routerLink: '/os-form' },
          { label: 'Listar OS', icon: 'pi pi-fw pi-list', routerLink: '/os-list' }
        ]
      },
      {
        label: 'Cadastros',
        icon: 'pi pi-fw pi-book',
        items: [
          { label: 'Clientes', icon: 'pi pi-fw pi-users', routerLink: '/cliente-list' },
          { label: 'Funcionários', icon: 'pi pi-fw pi-id-card', routerLink: '/funcionario-list' },
          { label: 'Fornecedores', icon: 'pi pi-fw pi-truck', routerLink: '/fornecedor-list' },
        ]
      },
      {
        label: 'Estoque',
        icon: 'pi pi-fw pi-database',
        items: [
          { label: 'Peças', icon: 'pi pi-fw pi-cog', routerLink: '/peca-list' },
          { label: 'Serviços', icon: 'pi pi-fw pi-wrench', routerLink: '/servico-list' },
          { label: 'Veículos', icon: 'pi pi-fw pi-car', routerLink: '/veiculo-list' },
        ]
      }
    ];
  }
}