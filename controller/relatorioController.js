
const connection = require('../src/db')

class relatorioController {
    async gerarRelatorio(req, res) {
        const { empresa_id, setor_id } = req.params;

        let query = `SELECT empresa.razao_social, GROUP_CONCAT(setor.descricao) AS setores `;
        query += `FROM empresa `;
        query += `LEFT JOIN empresa_setor ON empresa.id = empresa_setor.empresa_id `;
        query += `LEFT JOIN setor ON empresa_setor.setor_id = setor.id `;

        if (empresa_id && setor_id) {
            query += `WHERE empresa.id = ${empresa_id} AND setor.id = ${setor_id}`;
        } else if (empresa_id) {
            query += `WHERE empresa.id = ${empresa_id}`;
        } else if (setor_id) {
            query += `WHERE setor.id = ${setor_id}`;
        }

        query += ` GROUP BY empresa.id`;

        connection.query(query, function (error, results, fields) {
            if (error) {
                console.error('Erro ao gerar relatório:', error);
                return res.status(500).send('Erro ao gerar relatório');
            }
            res.json(results);
        });
    }
}

module.exports = new relatorioController();
