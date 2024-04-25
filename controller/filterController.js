const connection = require('../src/db')

class filterController {
    async gerarfilter(req, res) {
      const { filtroEmpresa, filtroSetor } = req.body;

      if (!(filtroEmpresa && filtroSetor)) {
        res.status(404).json({message: 'Dados inválidos'})
      }

      let query = 'SELECT * FROM empresa WHERE empresa.razao_social = ?';

      connection.query(query, [filtroEmpresa], function (error, results, fields) {
        if (error) {
          console.error('Erro ao gerar relatório:', error);
          return res.status(500).send('Erro ao gerar relatório');
        }
        res.json(results);
      });
    }
}

module.exports = new filterController();