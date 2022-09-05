const customExpress = require('./config/customExpress');
const conexao = require('./infraestrutura/conexao');
const TabelaUsers = require('./infraestrutura/tabelaUsers');
const TabelaVehicles = require('./infraestrutura/tabelaVehicles');
const TabelaVehiclesData = require('./infraestrutura/tabelaVehiclesData');
const cors = require('cors');


conexao.connect((erro) => {
    if(erro) {
        console.log(erro);
    } else {
        console.log('conectado com sucesso');

        TabelaUsers.init(conexao);
        TabelaVehicles.init(conexao);
        TabelaVehiclesData.init(conexao);
        const app = customExpress();
        app.use(cors());
        
        app.listen(3000, () => console.log('servidor rodando na porta 3000'));
    }
})


