const VehicleData = require('../models/vehicleData')

module.exports = (app) => {
    
    app.get('/vehicledata', (req, res) => {
        let valor = '';
        if(req.query.valor) {
            valor = req.query.valor
        }
        VehicleData.lista(valor, res)
    });

    app.get('/vehicledata/:id', (req, res) => {
        const id = parseInt(req.params.id);

        VehicleData.buscaPorId(id, res);
    });

    app.get('/vehicledata/vin/:VIN', (req, res) => {
        const vinNumber = req.params.VIN;

        VehicleData.buscoPorVin(vinNumber, res);
    });

    app.post('/vehicledata', (req, res) => {
        const vehicleData = req.body;

        VehicleData.adiciona(vehicleData, res)
    });

    app.put('/vehicledata/vin/:VIN', (req, res) => {
        const vinNumber = req.params.VIN;
        const valores = req.body;

        VehicleData.altera(vinNumber, valores, res);
    });

    app.delete('/vehicledata/vin/:VIN', (req, res) => {
        const vinNumber = req.params.VIN;

        VehicleData.deleta(vinNumber, res);
    });
}