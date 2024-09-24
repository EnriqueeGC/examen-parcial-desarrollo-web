
module.exports = (sequelize, Sequelize) => {
    const Cuenta = sequelize.define("cuenta", {
        id_cuenta: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        no_cuenta: {            
            type: Sequelize.STRING(25)
        },
        tipo_cuenta: {
            type: Sequelize.STRING(25)
        },
        nombre_completo: {
            type: Sequelize.STRING(55)
        },
        fecha_contratacion: {
            type: Sequelize.DATE
        },
        fecha_nacimiento: {
            type: Sequelize.DATE
        },
        genero: {
            type: Sequelize.STRING(25)
        },
        titulo: {
            type: Sequelize.STRING(25)
        },
        saldo: {
            type: Sequelize.INTEGER
        },
    });
    return Cuenta;
}