const db = require('../config/db.config.js');
const ControlDeTransacciones = db.ControlDeTransacciones;
const Cuenta = db.Cuenta;

// // '/api/controlDeTransacciones/create'
// exports.createTransaction = async (req, res) => {
//     try {
//         const { id_Cuenta, id_tipoTransaccion, MontoTransaccionCredito, MontoTransaccionDebito } = req.body;

//         // Crear la transacción
//         const transaccion = await controlTransaccion.create({
//             id_Cuenta,
//             id_tipoTransaccion,
//             MontoTransaccionCredito,
//             MontoTransaccionDebito
//         });

//         // Obtener la cuenta relacionada
//         const cuentaObj = await cuenta.findByPk(id_Cuenta);

//         // Actualizar el saldo
//         if (MontoTransaccionCredito) {
//             cuentaObj.saldo += MontoTransaccionCredito;
//         }

//         if (MontoTransaccionDebito) {
//             cuentaObj.saldo -= MontoTransaccionDebito;
//         }

//         // Guardar la cuenta con el saldo actualizado
//         await cuentaObj.save();

//         res.status(201).json({
//             message: 'Transacción creada y saldo actualizado',
//             transaccion
//         });
//     } catch (error) {
//         res.status(500).json({ message: 'Error al crear la transacción', error });
//     }
// };

// '/api/controlDeTransacciones/create'
/* exports.createTransaction = async (req, res) => {
    try {
        const { id_cuenta, id_tipo_transaccion, monto_transaccion_credito, monto_transaccion_debito } = req.body;

        // Crear la transacción
        const transaccion = await ControlDeTransacciones.create({
            id_cuenta,
            id_tipo_transaccion,
            monto_transaccion_credito,
            monto_transaccion_debito
        });
 
        // Obtener la cuenta relacionada    
        const cuentaObj = await Cuenta.findByPk(id_cuenta);
        
        // Actualizar el saldo
        if (monto_transaccion_credito) {
            cuentaObj.saldo += monto_transaccion_credito;
        }
        
        if (monto_transaccion_debito) {
            cuentaObj.saldo -= monto_transaccion_debito;
        }

        // Guardar la cuenta con el saldo actualizado
        await cuentaObj.save();

        res.status(201).json({
            message: 'Transacción creada y saldo actualizado',
            transaccion
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear la transacción', error });
    }
};
*/
exports.createTransaction = async (req, res) => {
    try {
        const { no_cuenta, id_tipo_transaccion, monto_transaccion_credito, monto_transaccion_debito } = req.body;

        // Verificar que al menos uno de los montos esté presente
        if (!monto_transaccion_credito && !monto_transaccion_debito) {
            return res.status(400).json({ message: 'Debe haber un monto de crédito o débito' });
        }

        // Verificar si la cuenta existe
        const cuentaObj = await Cuenta.findOne({ where: { no_cuenta } });
        if (!cuentaObj) {
            return res.status(404).json({ message: 'Cuenta no encontrada' });
        }

        // Crear la transacción
        const transaccion = await ControlDeTransacciones.create({
            no_cuenta,
            id_tipo_transaccion,
            monto_transaccion_credito,
            monto_transaccion_debito
        });

        // Actualizar el saldo
        if (monto_transaccion_credito) {
            cuentaObj.saldo += parseFloat(monto_transaccion_credito);  // Asegurarse de que sea numérico
        }

        if (monto_transaccion_debito) {
            cuentaObj.saldo -= parseFloat(monto_transaccion_debito);  // Asegurarse de que sea numérico
        }

        // Guardar la cuenta con el saldo actualizado
        await cuentaObj.save();

        res.status(201).json({
            message: 'Transacción creada y saldo actualizado',
            transaccion
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la transacción', error });
    }
};

// '/api/controlDeTransacciones/all'
exports.retrieveAllTransactions = (req, res) => {
    ControlDeTransacciones.findAll()
        .then(transactionsInfo => {
            res.status(200).json({
                message: "Get all transactions. Infos Succesfully!",
                transactions: transactionsInfo
            });
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: 'Error!',
                error: error
            });
        });
}

// '/api/controlDeTransacciones/onebyid/:id'
exports.getTransactionById = async (req, res) => {
    try {
        const transactionId = await ControlDeTransacciones.findByPk(req.params.id);
        if (!transactionId) {
            return res.status(404).json({
                message: 'Transacción no encontrada'
            });
        }
        res.status(200).json({
            message: 'Get Transacción by Id',
            transaction: transactionId
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error!',
            error: error
        });
    };
}

// '/api/controlDeTransacciones/update/:id'
exports.updateTransactionById = async (req, res) => {
    try {
        const { no_cuenta, id_tipo_transaccion, monto_transaccion_credito, monto_transaccion_debito } = req.body;
        const transactionId = await ControlDeTransacciones.findByPk(req.params.id);

        if (!transactionId) {
            return res.status(404).json({
                message: 'Transacción no encontrada'
            });
        }

        // Obtener la cuenta relacionada
        const cuentaObj = await Cuenta.findOne({ where: { no_cuenta } });
        if (!cuentaObj) {
            return res.status(404).json({ message: 'Cuenta no encontrada' });
        }

        // Actualizar el saldo
        if (monto_transaccion_credito) {
            cuentaObj.saldo += parseFloat(monto_transaccion_credito);  // Asegurarse de que sea numérico
        }

        if (monto_transaccion_debito) {
            cuentaObj.saldo -= parseFloat(monto_transaccion_debito);  // Asegurarse de que sea numérico
        }

        // Guardar la cuenta con el saldo actualizado
        await cuentaObj.save();

        // Actualizar la transacción
        await transactionId.update({
            no_cuenta,
            id_tipo_transaccion
        });

        res.status(200).json({
            message: 'Transacción actualizada',
            transaction: transactionId
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar la transacción', error });
    };
};

// '/api/controlDeTransacciones/delete/:id'
exports.deleteTransactionById = async (req, res) => {
    try {
        const transactionId = await ControlDeTransacciones.findByPk(req.params.id);
        if (!transactionId) {
            return res.status(404).json({
                message: 'Transacción no encontrada'
            });
        }

        // Obtener la cuenta relacionada
        const cuentaObj = await Cuenta.findOne({ where: { no_cuenta: transactionId.no_cuenta } });
        if (!cuentaObj) {
            return res.status(404).json({ message: 'Cuenta no encontrada' });
        }

        // Actualizar el saldo
        if (transactionId.monto_transaccion_credito) {
            cuentaObj.saldo -= parseFloat(transactionId.monto_transaccion_credito);  // Asegurarse de que sea numérico
        }

        if (transactionId.monto_transaccion_debito) {
            cuentaObj.saldo += parseFloat(transactionId.monto_transaccion_debito);  // Asegurarse de que sea numérico
        }

        // Guardar la cuenta con el saldo actualizado
        await cuentaObj.save();

        await transactionId.destroy();

        res.status(200).json({
            message: 'Transacción eliminada'
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar la transacción', error });
    };
};