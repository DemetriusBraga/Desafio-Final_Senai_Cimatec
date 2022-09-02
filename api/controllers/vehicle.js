const Vehicle = require('../models/vehicle')

module.exports = app => {
    app.get('/vehicle', (req, res) => {
        Vehicle.lista(res)
    });

    app.get('/vehicle/:id', (req, res) => {
        const id = parseInt(req.params.id);

        Vehicle.buscaPorId(id, res);
    });

    app.post('/vehicle', (req, res) => {
        const vehicle = req.body;

        Vehicle.adiciona(vehicle, res);
    });

    app.patch('/vehicle/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const valores = req.body;

        Vehicle.altera(id, valores, res);
    });

    app.delete('/vehicle/:id', (req, res) => {
        const id = parseInt(req.params.id);

        Vehicle.deleta(id, res);
    });
}