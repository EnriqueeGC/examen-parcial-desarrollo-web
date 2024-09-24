module.exports = (sequelize, Sequelize) => {
    const TipoTransaccion = sequelize.define("tipoTransaccion", {
        id_tipoTransaccion: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        descripcion: {
            type: Sequelize.STRING(20),  // Debito/Credito, etc.
            allowNull: false
        }
    });
    return TipoTransaccion;
}
