const conexao = require('../infraestrutura/conexao');

class VehicleData {
    adiciona(vehicleData, res) {
        const sql = 'INSERT INTO VehiclesData SET ?'

        conexao.query(sql, vehicleData, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro);
            } else {
                res.status(201).json(vehicleData);
            }
        })
    }

    lista(valor, res) {
        const sql = `SELECT id, Odometer, Tire_Pressure, Vehicle_Status, Battery_Status, Fuel_Level, Latitude, Longitude FROM VehiclesData WHERE VIN = '${valor}'`

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                const vehicledata = resultados
                const result = { vehiclesData: vehicledata };

                res.status(200).json(result)
            }
        })
    }

    buscaPorId(id, res) {
        const sql = `SELECT id, Odometer, Tire_Pressure, Vehicle_Status, Battery_Status, Fuel_Level, Latitude, Longitude FROM VehiclesData WHERE id=${id}`

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(resultados);
            }
        });
    }

    altera(id, valores, res) {
        const sql = 'UPDATE VehiclesData SET ? WHERE id=?'

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(valores);
            }
        });
    }

    deleta(id, res) {
        const sql = 'DELETE FROM VehiclesData WHERE id=?'

        conexao.query(sql, id, (erro, resultados) =>{
            if(erro){
                res.status(400).json(erro);
            } else {
                res.status(200).json({id});
            }
        });
    }
}

module.exports = new VehicleData