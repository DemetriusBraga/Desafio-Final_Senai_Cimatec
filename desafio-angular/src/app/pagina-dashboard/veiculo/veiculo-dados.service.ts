import { pluck, Observable, map, tap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { VeiculosDadosAPI, VeiculoDado } from './veiculo-dados';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class VeiculoDadosService {
  constructor(private httpClient: HttpClient) {}

  buscaPorVin(valor?: string) {
    return this.httpClient
      .get<VeiculosDadosAPI>(`${API}/vehicledata/vin/${valor}`)
      .pipe(
        tap((valor_1) => console.log(valor_1)),
        map((api) => api.vehiclesData)
      );
  }

  // buscaVeiculoDados(valor?: string) {
  //   const params = valor ? new HttpParams().append('valor', valor) : undefined;
  //   return this.httpClient
  //     .get<VeiculosDadosAPI>(`${API}/vehicledata`, { params })
  //     .pipe(map((api) => api.vehiclesData));
  // }
}
