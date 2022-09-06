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
        const sql = 'SELECT id, VIN, Odometer, Tire_Pressure, Vehicle_Status, Battery_Status, Fuel_Level, Latitude, Longitude FROM VehiclesData'

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

    buscoPorVin(valor, res) {
        const sql = `SELECT id, VIN, Odometer, Tire_Pressure, Vehicle_Status, Battery_Status, Fuel_Level, Latitude, Longitude FROM VehiclesData WHERE VIN = '${valor}'`

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
        const sql = `SELECT id, VIN, Odometer, Tire_Pressure, Vehicle_Status, Battery_Status, Fuel_Level, Latitude, Longitude FROM VehiclesData WHERE id=${id}`

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(resultados);
            }
        });
    }

    altera(vin, valores, res) {
        const sql = 'UPDATE VehiclesData SET ? WHERE VIN=?'

        conexao.query(sql, [valores, vin], (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(valores);
            }
        });
    }

    deleta(vin, res) {
        const sql = 'DELETE FROM VehiclesData WHERE VIN=?'

        conexao.query(sql, vin, (erro, resultados) =>{
            if(erro){
                res.status(400).json(erro);
            } else {
                res.status(200).json({resultados});
            }
        });
    }
}

module.exports = new VehicleData