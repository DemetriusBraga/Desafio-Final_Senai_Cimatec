import { VeiculoDadosService } from './../../veiculo/veiculo-dados.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { VeiculoDado } from './../../veiculo/veiculo-dados';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css'],
})
export class TabelaComponent implements OnInit {
  valorDoInput!: string;
  tabelaDeDados = new FormControl();

  // veiculoDadoSelecionado!: VeiculoDado | any;
  filtroPeloInput$ = this.tabelaDeDados.valueChanges.pipe(
    debounceTime(500),
    filter(
      (valorDigitado) => valorDigitado.length >= 5 || !valorDigitado.length
    ),
    distinctUntilChanged(),
    switchMap((valorDigitado) =>
      this.veiculoDadosService.buscaVeiculoDados(valorDigitado)
    )
  );
  // .subscribe((valor) => {
  //   if (valor.length < 2) {
  //     this.veiculoDadoSelecionado = valor;
  //   }
  // });

  // filtroPeloInput$ = this.tabelaDeDados.valueChanges.pipe(
  //   switchMap((valorDigitado) =>
  //     this.veiculoDadosService.buscaPorVin(valorDigitado)
  //   )
  // );

  constructor(private veiculoDadosService: VeiculoDadosService) {
    // this.veiculoDadosService.allVin().subscribe((data) => {
    //   if (data) this.veiculoDadoSelecionado = data;
    //   console.log(this.veiculoDadoSelecionado);
    // });
    // console.log(this.filtroPeloInput$);
  }
  // enviaInput(VIN: string) {
  //   this.veiculoDadosService
  //     .buscaPorVin(VIN)
  //     .subscribe((veiculoDadoSelecionado) => {
  //       this.veiculoDadoSelecionado = veiculoDadoSelecionado;
  //     });
  // }

  ngOnInit(): void {}
  // enviaVeiculoVin(VIN: string) {
  //   this.veiculoDadosService
  //     .buscaVeiculoDados(VIN)
  //     .subscribe((veiculoDadoSelecionado) => {
  //       this.veiculoDadoSelecionado = veiculoDadoSelecionado;
  //     });
  // }
}
