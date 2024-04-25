const mysql = require('mysql')

const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'projeto'
})



connection.connect(function (err) {
    if(err) {
        console.error('Erro ao conectar com o banco', err)
        return
    }
    console.log('Banco de dados conectado com sucesso!')
})

module.exports = connection;