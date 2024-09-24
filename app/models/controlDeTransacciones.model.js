module.exports = (sequelize, Sequelize) => {
    const ControlTransaccion = sequelize.define("controlTransaccion", {
        id_registro: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        no_cuenta: {
            type: Sequelize.STRING(25)
        },
        fecha_hora_ingreso: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        id_tipo_transaccion: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        monto_transaccion_credito: {
            type: Sequelize.FLOAT,
            allowNull: true  // Puede ser nulo si no es una transacción de crédito
        },
        monto_transaccion_debito: {
            type: Sequelize.FLOAT,
            allowNull: true  // Puede ser nulo si no es una transacción de débito
        }
    });
    return ControlTransaccion;
}
