const express = require('express')
const router = express.Router()
const empresaController = require('../controller/empresaController')
const setorController = require('../controller/setorController')
const relatorioController = require('../controller/relatorioController')
const filterController = require('../controller/filterController')
const runAsync = fn => (req, res, next) => Promise.resolve(fn(req, res)).catch(next)

router.post('/empresa.add', runAsync(empresaController.adicionar))
router.get('/empresa.list', runAsync(empresaController.listar))
router.put('/empresa/:id', runAsync(empresaController.alterar))
router.delete('/empresa/:id', runAsync(empresaController.deletar))


router.post('/setor.add', runAsync(setorController.adicionar))
router.get('/setor.list', runAsync(setorController.listar))
router.put('/setor/:id', runAsync(setorController.alterar))
router.delete('/setor/:id', runAsync(setorController.deletar))

router.get('/relatorio-empresas', runAsync(relatorioController.gerarRelatorio))
router.post('/filtrar', runAsync(filterController.gerarfilter))

module.exports = router
