import { pluck, Observable, map } from 'rxjs';
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

  buscaVeiculoDados(valor?: string) {
    const params = valor ? new HttpParams().append('valor', valor) : undefined;
    return this.httpClient
      .get<VeiculosDadosAPI>(`${API}/vehicledata`, { params })
      .pipe(pluck('vehicleData'));
  }

  // buscaVeiculoDados(valor?: string) {
  //   const params = valor ? new HttpParams().append('valor', valor) : undefined;
  //   return this.httpClient
  //     .get<VeiculosDadosAPI>(`${API}/vehicledata`, { params })
  //     .pipe(map((api) => api.vehicleData));
  // }

  buscaPorVin(valor?: string) {
    return this.httpClient
      .get<VeiculosDadosAPI>(`${API}/vehicledata/vin/${valor}`)
      .pipe(pluck('vehicleData'));
  }

  allVin() {
    return this.httpClient.get<VeiculoDado>(`${API}/vehicledata`);
  }

  // buscaPorVin(valor?: string) {
  //   const params = valor ? new HttpParams().append('valor', valor) : undefined;
  //   return this.httpClient
  //     .get<VeiculosDadosAPI>(`${API}/vehicledata/vin/${valor}`, {
  //       params,
  //     })
  //     .pipe(pluck('vehicleData'));
  // }

  // inputVin(VIN: number): Observable<VeiculoDados> {
  //   return this.httpClient.get<VeiculoDados>(`${API}/vehicledata/vin/${VIN}`);
  // }
}