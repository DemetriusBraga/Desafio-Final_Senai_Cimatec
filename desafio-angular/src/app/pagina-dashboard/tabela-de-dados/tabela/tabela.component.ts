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
  constructor(private veiculoDadosService: VeiculoDadosService) {}

  valorDoInput!: string;
  tabelaDeDados = new FormControl();
  filtroPeloInput$ = this.tabelaDeDados.valueChanges.pipe(
    debounceTime(500),
    filter(
      (valorDigitado) => valorDigitado.length >= 5 || !valorDigitado.length
    ),
    distinctUntilChanged(),
    switchMap((valorDigitado) =>
      this.veiculoDadosService.buscaPorVin(valorDigitado)
    )
  );
  ngOnInit(): void {}
}
