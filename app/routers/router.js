
let express = require('express');
let router = express.Router();
/* 
const libro = require('../controllers/libro.controller.js');

// CRUD 
router.post('/api/libro/create', libro.create);
router.get('/api/libro/all', libro.retrieveAllLibros);
router.get('/api/libro/onebyid/:id', libro.getLibroById);
router.put('/api/libro/update/:id', libro.updateLibroById);
router.delete('/api/libro/delete/:id', libro.deleteLibroById);

router.put('/api/music/update/:id', music.updateMusicById);
router.delete('/api/music/delete/:id', music.deleteMusicById);
 */

const cuenta = require('../controllers/cuenta.controller.js');
const tipoTransaccion = require('../controllers/tipoTransaccion.controller.js');
const controlDeTransacciones = require('../controllers/controlDeTransacciones.controller.js');

//CUENTA
router.post('/api/cuenta/create', cuenta.create);
router.get('/api/cuenta/all', cuenta.retrieveAllCuentas);
router.get('/api/cuenta/onebyid/:id', cuenta.getCuentaById);
router.put('/api/cuenta/update/:id', cuenta.updateCuentaById);
router.delete('/api/cuenta/delete/:id', cuenta.deleteCuentaById);


// TIPO TRANSACCION
router.post('/api/tipoTransaccion/create', tipoTransaccion.create);
router.get('/api/tipoTransaccion/all', tipoTransaccion.retrieveAllTipoTransaccion);
router.get('/api/tipoTransaccion/onebyid/:id', tipoTransaccion.getTipoTransaccionById);
router.put('/api/tipoTransaccion/update/:id', tipoTransaccion.updateTipoTransaccionById);
router.delete('/api/tipoTransaccion/delete/:id', tipoTransaccion.deleteTipoTransaccionById);

//CONTROL DE TRANSACCIONES
router.post('/api/controlDeTransacciones/create', controlDeTransacciones.createTransaction);
router.get('/api/controlDeTransacciones/all', controlDeTransacciones.retrieveAllTransactions);
router.get('/api/controlDeTransacciones/onebyid/:id', controlDeTransacciones.getTransactionById);
router.put('/api/controlDeTransacciones/update/:id', controlDeTransacciones.updateTransactionById);
router.delete('/api/controlDeTransacciones/delete/:id', controlDeTransacciones.deleteTransactionById);

module.exports = router;