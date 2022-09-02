class TabelaUsers {
    init(conexao) {
      this.conexao = conexao;
      
      this.criarUsers();
      this.inserirDefaultUsers();
      this.exibirDefaultUsers();
    }
  
    criarUsers() {
      const sql =
        "CREATE TABLE IF NOT EXISTS Users (id int NOT NULL AUTO_INCREMENT, Name varchar(20) NOT NULL, Email varchar(30) NOT NULL, Password varchar(50) NOT NULL, Full_Name varchar(50) NOT NULL, Join_Date TIMESTAMP DEFAULT current_timestamp,  PRIMARY KEY(id))";
  
      this.conexao.query(sql, (erro) => {
        if (erro) {
          console.log(erro);
        } else {
          console.log("Tabela Users criada com sucesso");
        }
      });
    }

    inserirUsers(Name, Email, Password, Full_Name) {
      const sql =
      `INSERT INTO Users (Name, Email, Password, Full_Name) SELECT '${Name}', '${Email}', '${Password}', '${Full_Name}' WHERE NOT EXISTS (SELECT * FROM Users WHERE Email='${Email}')`
     
      this.conexao.query(sql, (erro) => {
        if (erro) {
          console.log(erro);
        } else {
          // console.log({Name, Email, Password, Full_Name});
        }
      });
    }

    inserirDefaultUsers() {
      this.inserirUsers('admin', 'admin@ford.com', '123456', 'Admin');
      this.inserirUsers('demetrius', 'demetrius@ford.com', '123456', 'demetrius braga');
    }

    exibirDefaultUsers() {
      const sql = "SELECT * FROM Users";
      this.conexao.query(sql, (erro, resultado) => {
        if(erro) {
          console.log(erro);
        } else {
          console.log(...resultado);
        }
      });
    }

  }
  
  module.exports = new TabelaUsers();
  