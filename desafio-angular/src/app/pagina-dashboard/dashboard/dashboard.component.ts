import { VeiculoService } from './../veiculo/veiculo.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { Veiculo } from '../veiculo/veiculo';

declare var google: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  exibirGraficos() {
    this.exibirDonutChart('chart_1', this.conectados);
    this.exibirDonutChart('chart_2', this.atualizados);
  }

  veiculos$ = this.veiculoService.modeloVeiculos();
  veiculoId!: string;
  veiculoSelecionado!: Veiculo;

  conectados: any = [];
  atualizados: any = [];
  porcentagemChart1 = 0;
  porcentagemChart2 = 0;
  // private dados: any;

  constructor(private veiculoService: VeiculoService) {}

  ngOnInit() {
    // this.enviaVeiculoId('1');
  }

  enviaVeiculoId(id: string) {
    this.veiculoService.veiculoId(id).subscribe((veiculoSelecionado) => {
      this.veiculoSelecionado = veiculoSelecionado;

      const porcentagemConectados =
        (this.veiculoSelecionado.Connected * 100) /
        this.veiculoSelecionado.Volume_Total;
      this.porcentagemChart1 = Math.round(porcentagemConectados * 10) / 10;
      const porcentagemNaoConectados = 100 - porcentagemConectados;
      this.conectados = [
        ['Conectados', porcentagemConectados],
        ['Não conectados', porcentagemNaoConectados],
      ];
      const porcentagemAtualizados =
        (this.veiculoSelecionado.Software_Updates * 100) /
        this.veiculoSelecionado.Volume_Total;
      this.porcentagemChart2 = Math.round(porcentagemAtualizados * 10) / 10;
      const porcentagemNaoAtualizados = 100 - porcentagemAtualizados;
      this.atualizados = [
        ['Atualizados', porcentagemAtualizados],
        ['Não atualizados', porcentagemNaoAtualizados],
      ];
      this.init();
    });
  }

  init(): void {
    if (typeof google !== 'undefined') {
      google.charts.load('current', { packages: ['corechart'] });
      setTimeout(() => {
        google.charts.setOnLoadCallback(
          this.exibirDonutChart('chart_1', this.conectados)
        );
        google.charts.setOnLoadCallback(
          this.exibirDonutChart('chart_2', this.atualizados)
        );
      }, 300);
    }
  }

  exibirDonutChart(id: string, data: any): void {
    const el = document.getElementById(id);
    const chart = new google.visualization.PieChart(el);
    const opcoes = this.obterOpcoes();

    opcoes['pieHole'] = 0.3;
    chart.draw(this.obterDadosVeiculo(data), opcoes);
  }

  obterDadosVeiculo(data: any): any {
    const dataTable = new google.visualization.DataTable();

    dataTable.addColumn('string', '');
    dataTable.addColumn('number', 'Porcentagem');
    dataTable.addRows(data);

    return dataTable;
  }

  obterOpcoes(): any {
    return {
      height: 180,
      legend: 'none',
      slices: {
        0: { color: '#0261b4' },
        1: { color: '#878787' },
      },
    };
  }

  // init(): void {
  //   if (typeof google !== 'undefined') {
  //     google.charts.load('current', { packages: ['corechart'] });
  //     setTimeout(() => {
  //       google.charts.setOnLoadCallback(this.exibirGraficos());
  //     }, 1000);
  //   }
  // }

  // exibirGraficos(): void {
  //   this.exibirDonutChart();
  //   this.exibirDonutChart();
  // }

  // exibirDonutChart(): void {
  //   const el = document.getElementById('donut_chart');
  //   const chart = new google.visualization.PieChart(el);
  //   const opcoes = this.obterOpcoes();

  //   opcoes['pieHole'] = 0.3;
  //   chart.draw(this.obterDadosVeiculo(), opcoes);
  // }

  // obterDadosVeiculo(): any {
  //   const data = new google.visualization.DataTable();

  //   data.addColumn('number', 'Model');
  //   data.addColumn('number', 'Total_Vendas');
  //   data.addRows(
  //     this.dados
  //     // ['Total_Vendas', this.veiculoSelecionado.volumetotal],
  //     // ['Conectados', this.veiculoSelecionado.connected],
  //   );

  //   return data;
  // }

  // obterOpcoes(): any {
  //   return {
  //     title: 'Vendas',
  //     width: 400,
  //     height: 300,
  //   };
  // }
}
