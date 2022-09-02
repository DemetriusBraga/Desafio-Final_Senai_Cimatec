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

        VehicleData.lista(vinNumber, res);
    });

    app.post('/vehicledata', (req, res) => {
        const vehicleData = req.body;

        VehicleData.adiciona(vehicleData, res)
    });

    app.patch('/vehicledata/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const valores = req.body;

        VehicleData.altera(id, valores, res);
    });

    app.delete('/vehicledata/:id', (req, res) => {
        const id = parseInt(req.params.id);

        VehicleData.deleta(id, res);
    });
}