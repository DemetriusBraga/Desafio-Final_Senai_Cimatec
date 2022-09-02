class TabelaVehiclesData {
    init(conexao) {
      this.conexao = conexao;
  
      this.criarVehiclesData();
      this.inserirDefaultVehiclesData();
      this.exibirDefaultVehiclesData();
    }
  
    criarVehiclesData() {
      const sql =
        "CREATE TABLE IF NOT EXISTS VehiclesData (id int NOT NULL PRIMARY KEY AUTO_INCREMENT, VIN varchar(20) NOT NULL UNIQUE, Odometer VARCHAR(30) DEFAULT ('') NOT NULL, Tire_Pressure VARCHAR(30) DEFAULT ('') NOT NULL, Vehicle_Status VARCHAR(30) DEFAULT ('') NOT NULL, Battery_Status VARCHAR(30) DEFAULT ('') NOT NULL, Fuel_Level VARCHAR(30) DEFAULT ('') NOT NULL, Latitude VARCHAR(30) DEFAULT ('') NOT NULL, Longitude VARCHAR(30) DEFAULT ('') NOT NULL)";
  
      this.conexao.query(sql, (erro) => {
        if (erro) {
          console.log(erro);
        } else {
          console.log("Tabela VehiclesData criada com sucesso");
        }
      });
    }

    inserirVehiclesData(VIN, Odometer, Tire_Pressure, Vehicle_Status, Battery_Status, Fuel_Level, Latitude, Longitude) {
      const sql =
      `INSERT INTO VehiclesData (VIN, Odometer, Tire_Pressure, Vehicle_Status, Battery_Status, Fuel_Level, Latitude, Longitude) SELECT '${VIN}', '${Odometer}', '${Tire_Pressure}', '${Vehicle_Status}', '${Battery_Status}', '${Fuel_Level}', '${Latitude}', '${Longitude}' WHERE NOT EXISTS (SELECT * FROM VehiclesData WHERE VIN='${VIN}')`
     
      this.conexao.query(sql, (erro) => {
        if (erro) {
          console.log(erro);
        } else {
          // console.log('VehicleData');
          // console.log({VIN, Odometer, Tire_Pressure, Vehicle_Status, Battery_Status, Fuel_Level, Latitude, Longitude});
        }
      });
    }

    inserirDefaultVehiclesData() {
      this.inserirVehiclesData('2FRHDUYS2Y63NHD22454', '23344', '36,36,35,34', 'on', 'Ok', '76','-12,2322', '-35,2314');
      this.inserirVehiclesData('2RFAASDY54E4HDU34874', '130000', '36,34,36,33', 'off', 'Recharge', '19','-12,2322', '-35,2314');
      this.inserirVehiclesData('2FRHDUYS2Y63NHD22455', '50000', '36,36,35,34', 'on', 'Ok', '90','-12,2322', '-35,2314');
      this.inserirVehiclesData('2RFAASDY54E4HDU34875', '10000', '36,34,36,33', 'off', 'Ok', '25','-12,2322', '-35,2314');
    }

    exibirDefaultVehiclesData() {
      const sql = "SELECT * FROM VehiclesData";
      this.conexao.query(sql, (erro, resultado) => {
        if(erro) {
          console.log(erro);
        } else {
          console.log(...resultado);
        }
      });
    }

  }
  
  module.exports = new TabelaVehiclesData();