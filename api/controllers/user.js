const User = require('../models/user')
const jwt = require('jsonwebtoken');

module.exports = app => {

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Expose-Headers", "x-access-token");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header("Access-Control-Allow-Headers", `x-access-token, Origin, X-Requested-With, X-XSRF-TOKEN, Authorization, Content-Type, Accept`);
    
        next()
    });

    app.get('/user', (req, res) => {
        User.lista(res);
    });

    app.get('/user/:id', (req, res) => {
        const id = parseInt(req.params.id);

        User.buscaPorId(id, res);
    });
    
    app.get('/user/exist/:Name', (req, res) => {
        const name = req.params.Name;

        User.buscaUser(name, res);
    });

    app.post('/user', (req, res) => {
        const user = req.body

        User.adiciona(user, res)
    });

    app.post('/user/login',(req,res,next)=>{
        const user = req.body
        User.login(user,res,req,next)
    })

    //poderia ser feito com o post, mas para manter o padrão Rest foi utilizado o patch
    app.patch('/user/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const valores = req.body;

        User.altera(id, valores, res);
    });

    app.delete('/user/:id', (req, res) => {
        const id = parseInt(req.params.id);

        User.deleta(id, res);
    });
}