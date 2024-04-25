const Setor = require('../models/setor')
const connection = require('../src/db')

class setorController {
    async adicionar (req, res) {
        const {descricao} = req.body

        if(!descricao) {
            return res.status(422).send("Descrição obrigatória")
        }

        const novoSetor = new Setor(null, descricao)
        connection.query(`INSERT INTO setor (descricao) VALUES ("${novoSetor.descricao}")`, function (error, results, fields) {
            if(error) return res.status(500).send(`Erro ao inserir setor ${error}`)
            else return res.status(201).send(`Setor adicionado com sucesso`)
        })
    }

    async listar (req, res) {
        connection.query(`SELECT * FROM setor`, function (error, results, fields) {
            if (error) return res.status(500).send(`Erro ao listar setores ${error}`)
            else return res.status(200).json(results)
        })
    }

    async alterar (req, res) {
        const {id} = req.params
        const {descricao} = req.body

        function validar({descricao}) {
            if(!descricao) return "Descrição obrigatória"
            return undefined
        }

        const erro = validar({ descricao })
        if (erro) return res.status(422).send(erro)

        connection.query(`UPDATE setor SET descricao="${descricao}" WHERE id=${id}`, function(error, results, fields) {
        if (error) return res.status(500).send(`Erro ao alterar setor ${error}`)
        else return res.status(200).send('Setor alterado com sucesso')
        })
    }

    async deletar (req, res) {
        const {id} = req.params
        connection.query(`DELETE FROM setor WHERE id=${id}`, function (error, results, fields) {
            if (error) return res.status(500).send(`Erro ao excluir setor ${error}`)
            else return res.status(200).send('Setor excluído com sucesso')
        })
    }

}

module.exports = new setorController()