import { AdicionarComponent } from './tabela-de-dados/adicionar/adicionar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'pagina-dashboard/tabela-de-dados/adicionar',
    component: AdicionarComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule],
})
export class PaginaDashboardRoutingModule {}
