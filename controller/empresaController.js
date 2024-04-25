const Empresa = require('../models/empresa')
const connection = require('../src/db')

class empresaController {
    async adicionar (req, res) {
        const { razao_social, nome_fantasia, cnpj } = req.body
        function validar ({razao_social, cnpj}) {
            if(!razao_social) return res.status(422).send("Razão Social obrigatória")
            if(!cnpj) return res.status(422).send("Cnpj obrigatório")
        }

        if (validar({razao_social, cnpj})) return;

        const empresa = new Empresa(null, razao_social, nome_fantasia, cnpj)
        connection.query(`INSERT INTO empresa (razao_social, nome_fantasia, cnpj) VALUES ("${empresa.razao_social}","${empresa.nome_fantasia}","${empresa.cnpj}")`, function (error, results, fields) {
            if(error) return res.status(500).send(`Erro ao inserir empresa ${error}`)
            else return res.status(201).send('Empresa criada com sucesso')
        })
    }

    async listar(req, res) {
        connection.query(`SELECT * FROM empresa`, function(error, results, fields) {
            if (error) return res.status(500).send(`Erro ao listar empresas ${error}`)
            else return res.status(200).json(results)
        });
    }

    async alterar(req, res) {
        const { id } = req.params
        const { razao_social, nome_fantasia, cnpj } = req.body 

    
    function validar({ razao_social, nome_fantasia, cnpj }) {
        if (!razao_social) return "Razão Social obrigatória"
        if (!nome_fantasia) return "Nome fantasia obrigatório"
        if (!cnpj) return "CNPJ obrigatório"
        return undefined
    }

    const erro = validar({ razao_social, nome_fantasia, cnpj })
    if (erro) return res.status(422).send(erro)


    connection.query(`UPDATE empresa SET razao_social="${razao_social}", nome_fantasia="${nome_fantasia}", cnpj="${cnpj}" WHERE id=${id}`, function(error, results, fields) {
        if (error) return res.status(500).send(`Erro ao alterar empresa ${error}`)
        else return res.status(200).send('Empresa alterada com sucesso')
        })
    }

    async deletar(req, res) {
        const { id } = req.params;
        connection.query(`DELETE FROM empresa WHERE id=${id}`, function(error, results, fields) {
        if (error) return res.status(500).send(`Erro ao excluir empresa ${error}`)
        else return res.status(200).send('Empresa excluída com sucesso')
    });
    }



}

module.exports = new empresaController()