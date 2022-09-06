import { MensagemModule } from './../componentes/mensagem/mensagem.module';
import { VeiculoDadosService } from './veiculo/veiculo-dados.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CabecalhoModule } from './../componentes/cabecalho/cabecalho.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginaDashboardRoutingModule } from './pagina-dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TabelaComponent } from './tabela-de-dados/tabela/tabela.component';
import { AdicionarComponent } from './tabela-de-dados/adicionar/adicionar.component';

@NgModule({
  declarations: [DashboardComponent, TabelaComponent, AdicionarComponent],
  imports: [
    CommonModule,
    PaginaDashboardRoutingModule,
    CabecalhoModule,
    FormsModule,
    ReactiveFormsModule,
    MensagemModule,
  ],
  providers: [VeiculoDadosService],
  exports: [AdicionarComponent],
})
export class PaginaDashboardModule {}
