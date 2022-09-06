import { VeiculoDadosService } from './../../veiculo/veiculo-dados.service';
import { VeiculoDado } from './../../veiculo/veiculo-dados';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adicionar',
  templateUrl: './adicionar.component.html',
  styleUrls: ['./adicionar.component.css'],
})
export class AdicionarComponent implements OnInit {
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

  constructor(private veiculoDadosService: VeiculoDadosService) {}

  ngOnInit(): void {}

  salvarDados() {
    console.log(this.veiculoDado);

    this.veiculoDadosService
      .cadastraVeiculoDado(this.veiculoDado)
      .subscribe((res) => {
        this.veiculoDado = res;
      });
  }

  atualizarDados() {
    console.log(this.veiculoDado);

    this.veiculoDadosService
      .atualizaPorVin(this.veiculoDado)
      .subscribe((res) => {
        this.veiculoDado = res;
      });
  }
}
