import { VeiculoDadosService } from './../../veiculo/veiculo-dados.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { VeiculoDado } from './../../veiculo/veiculo-dados';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css'],
})
export class TabelaComponent implements OnInit {
  constructor(private veiculoDadosService: VeiculoDadosService) {}

  veiculoDado: VeiculoDado = {
    VIN: '',
    Odometer: '',
    Tire_Pressure: '',
    Vehicle_Status: '',
    Battery_Status: '',
    Fuel_Level: '',
    Latitude: '',
    Longitude: '',
  };

  vinDefault = '2FRHDUYS2Y63NHD22454';
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

  ngOnInit(): void {
    this.veiculoDadosService
      .buscaPorVin(this.vinDefault)
      .subscribe(() => this.filtroPeloInput$);
  }

  excluir() {
    Swal.fire({
      title: `Confirma que deseja excluir os dados referentes ao VIN?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.value) {
        this.veiculoDadosService
          .excluiPorVin(this.veiculoDado)
          .subscribe((res) => {
            this.veiculoDado = res;
          });
        Swal.fire('Excluído', 'Os dados foram removidos', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Ação cancelada', 'Os dados estão seguros', 'error');
      }
    });
  }
}
