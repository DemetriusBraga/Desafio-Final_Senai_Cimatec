const conexao = require('../infraestrutura/conexao');

class Vehicle {
    adiciona(vehicle, res) {
        const sql = 'INSERT INTO Vehicles SET ?'

        conexao.query(sql, vehicle, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro);
            } else {
                res.status(201).json(vehicle);
            }
        })
    }

    lista(res) {
        const sql = 'SELECT * FROM Vehicles'

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                const result = { vehicles: resultados };

                res.status(200).json(result)
            }
        })
    }

    buscaPorId(id, res) {
        const sql = `SELECT * FROM Vehicles WHERE id=${id}`

        conexao.query(sql, (erro, resultados) => {
            const vehicle = resultados[0]
            if(erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(vehicle);
            }
        });
    }

    altera(id, valores, res) {
        const sql = 'UPDATE Vehicles SET ? WHERE id=?'

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(valores);
            }
        });
    }

    deleta(id, res) {
        const sql = 'DELETE FROM Vehicles WHERE id=?'

        conexao.query(sql, id, (erro, resultados) =>{
            if(erro){
                res.status(400).json(erro);
            } else {
                res.status(200).json({id});
            }
        });
    }
}

module.exports = new Vehicle