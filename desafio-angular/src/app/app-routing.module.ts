import { dashboardRoutes } from './pagina-dashboard/pagina-dashboard-routing.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    // redirectTo: 'login',
    redirectTo: 'pagina-dashboard',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'pagina-home',
    loadChildren: () =>
      import('./pagina-home/pagina-home.module').then(
        (m) => m.PaginaHomeModule
      ),
  },
  {
    path: 'pagina-dashboard',
    loadChildren: () =>
      import('./pagina-dashboard/pagina-dashboard.module').then(
        (m) => m.PaginaDashboardModule
      ),
  },
  ...dashboardRoutes,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
