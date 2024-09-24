let express = require('express');
let router = express.Router();

const customers = require('../controllers/customer.controller.js');

router.post('/customers/create', customers.create);
router.get('/customers/getAll', customers.retrieveAll);
router.get('/customers/getById/:id', customers.findById);
router.put('/customers/update/:id', customers.updateById);
router.delete('/customers/delete/:id', customers.deleteById);

module.exports = router;