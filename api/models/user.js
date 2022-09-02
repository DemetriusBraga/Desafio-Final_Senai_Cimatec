const conexao = require('../infraestrutura/conexao');

class User {
    adiciona(user, res) {
        const usuarioValido = user.Name.length >= 2

        const validacoes = [{
            nome: "Name",
            valido: usuarioValido,
            mensagem: "Usuario deve ter pelo menos 2 caracteres",
        }];

        const erros = validacoes.filter((campo) => !campo.valido);
        const existemErros = erros.length;

        if(existemErros) {
            res.status(400).json(erros);
        } else {
            const sql = 'INSERT INTO Users SET ?'

            conexao.query(sql, user, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro);
            } else {
                res.status(201).json(user);
            }
        });

        }
    }

    lista(res) {
        const sql = 'SELECT * FROM Users'

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, res) {
        const sql = `SELECT * FROM Users WHERE id=${id}`

        conexao.query(sql, [id], (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(resultados);
            }
        });
    }

    login(user, res) {
        const usuario = this.buscaUser(user.Name);

        const verifica = bcrypt.compare(user.password, usuario.password);

        try{
            const secret = process.env.SECRET
            const token = jwt.sign({id:usuario.id,name:usuario.Name,email:usuario.Email,expiresIn: 86400},secret);  
            console.log(`${user.userName} autorizado`)
            res.set('x-access-token',token);
            res.status(200).json({msg: 'Autenticação realizada com Sucesso',auth:true, token:token})
            
        }catch(err){
            console.log(err)

            res.status(500).json({
                msg: 'Aconteceu um erro no Servidor, tente novamente mais tarde'
            })
        }

    }

    buscaUser(Name, res) {
        const sql = `SELECT * FROM Users WHERE Name = ?`

        conexao.query(sql,[Name],(erro,resultado)=>{
            if(erro){
                res.status(400).json(erro)
            }else {
                resultado = resultado[0]
                if(!resultado){
                    res.status(400).json(erro)
                }else{
                res.status(200).json(resultado)
                }
            }
        })
    }

    altera(id, valores, res) {
        const sql = 'UPDATE Users SET ? WHERE id=?'

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(valores);
            }
        });
    }

    deleta(id, res) {
        const sql = 'DELETE FROM Users WHERE id=?'

        conexao.query(sql, id, (erro, resultados) =>{
            if(erro){
                res.status(400).json(erro);
            } else {
                res.status(200).json({id});
            }
        });
    }
}

module.exports = new User