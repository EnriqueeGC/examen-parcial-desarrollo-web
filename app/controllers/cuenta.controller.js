const db = require('../config/db.config.js');
const Cuenta = db.Cuenta;

// '/api/cuenta/create'
exports.create = (req, res) => {
    let cuenta = {};

    try {
        cuenta.no_cuenta = req.body.no_cuenta;
        cuenta.tipo_cuenta = req.body.tipo_cuenta;
        cuenta.nombre_completo = req.body.nombre_completo;
        cuenta.fecha_contratacion = req.body.fecha_contratacion;
        cuenta.fecha_nacimiento = req.body.fecha_nacimiento;
        cuenta.genero = req.body.genero;
        cuenta.titulo = req.body.titulo;
        cuenta.saldo = req.body.saldo;

        Cuenta.create(cuenta).then(result => {
            res.status(200).json({
                message: "Upload Successfully a Cuenta with id = " + result.id_cuenta,
                cuenta: result,
            });
        });    
    } catch (error) {
        res.status(500).json({
            message: 'Fail',
            error: error.message
        }); 
    };
};

// '/api/cuenta/all'
exports.retrieveAllCuentas = (req, res) => {
    Cuenta.findAll()
    .then(cuentasInfo => {
        res.status(200).json({
            message: "Get all cuentas. Infos Succesfully!",
            cuenta: cuentasInfo
        });
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({
            message: 'Error!',
            error: error
        });
    });
};

// '/api/cuenta/onebyid/:id'
exports.getCuentaById = async (req, res) => {
    try {
        const cuentaId = await Cuenta.findByPk(req.params.id);
        if (!cuentaId) {
            return res.status(404).json({
                message: 'Cuenta not found'
            });
        }
        res.status(200).json({
            message: 'Get Cuenta by Id',
            cuenta: cuentaId
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error!',
            error: error
        });
    };
};

// '/api/cuenta/update/:id'
exports.updateCuentaById = async (req, res) => {
    try {
        let cuenta = {
            no_cuenta: req.body.no_cuenta,
            tipo_cuenta: req.body.tipo_cuenta,
            nombre_completo: req.body.nombre_completo,
            fecha_contratacion: req.body.fecha_contratacion,
            fecha_nacimiento: req.body.fecha_nacimiento,
            genero: req.body.genero,
            titulo: req.body.titulo,
            salario: req.body.salario
        };
        let cuentaId = req.params.id;
        let updateCuenta = await Cuenta.update(cuenta, {where: {id_cuenta: cuentaId}});
        if (updateCuenta == 1) {
            res.status(200).json({
                message: 'Cuenta was updated successfully!',
                cuenta: cuenta
            });
        } else {
            res.status(404).json({
                message: 'Cuenta not found!'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error!',
            error: error
        });
    };
};

// '/api/cuenta/delete/:id'
exports.deleteCuentaById = async (req, res) => {
    try {
        let cuentaId = req.params.id;
        let cuenta = await Cuenta.findByPk(cuentaId);
        if (!cuenta) {
            res.status(404).json({
                message: 'Cuenta not found!'
            });
        } else {
            await Cuenta.destroy({where: {id_cuenta: cuentaId}});
            res.status(200).json({
                message: 'Cuenta was deleted successfully!',
                cuenta: cuenta
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error!',
            error: error
        });
    };
};
