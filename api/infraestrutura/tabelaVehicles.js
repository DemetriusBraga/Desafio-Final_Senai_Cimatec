class TabelaVehicles {
    init(conexao) {
      this.conexao = conexao;
  
      this.criarVehicles();
      this.inserirDefaultVehicles();
      this.exibirDefaultVehicles();
    }
  
    criarVehicles() {
      const sql =
        "CREATE TABLE IF NOT EXISTS Vehicles (id int NOT NULL AUTO_INCREMENT, Model varchar(50) NOT NULL, Volume_Total int, Connected int, Software_Updates int,  PRIMARY KEY(id))";
  
      this.conexao.query(sql, (erro) => {
        if (erro) {
          console.log(erro);
        } else {
          console.log("Tabela Vehicles criada com sucesso");
        }
      });
    }

    inserirVehicles(Model, Volume_Total, Connected, Software_Updates) {
      const sql =
      `INSERT INTO Vehicles (Model, Volume_Total, Connected, Software_Updates) SELECT '${Model}', ${Volume_Total}, ${Connected}, ${Software_Updates} WHERE NOT EXISTS (SELECT * FROM Vehicles WHERE Model='${Model}')`
     
      this.conexao.query(sql, (erro) => {
        if (erro) {
          console.log(erro);
        } else {
          // console.log({Model, Volume_Total, Connected, Software_Updates});
        }
      });
    }

    inserirDefaultVehicles() {
      this.inserirVehicles('Ranger', 145760, 70000, 27550);
      this.inserirVehicles('Mustang', 1500, 500, 750);
      this.inserirVehicles('Territory', 4560, 4000, 3050);
      this.inserirVehicles('Bronco Sport', 7560, 4060, 2050);
    }

    exibirDefaultVehicles() {
      const sql = "SELECT * FROM Vehicles";
      this.conexao.query(sql, (erro, resultado) => {
        if(erro) {
          console.log(erro);
        } else {
          console.log(...resultado);
        }
      });
    }

  }

  
  module.exports = new TabelaVehicles();