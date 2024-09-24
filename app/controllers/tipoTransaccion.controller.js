const db = require('../config/db.config.js');
const TipoTransaccion = db.TipoTransaccion;

// '/api/tipoTransaccion/create'
exports.create = (req, res) => {
    let tipoTransaccion = {};

    try {
        tipoTransaccion.descripcion = req.body.descripcion;

        TipoTransaccion.create(tipoTransaccion).then(result => {
            res.status(200).json({
                message: "Upload Successfully a TipoTransaccion with id = " + result.id_tipoTransaccion,
                tipoTransaccion: result,
            });
        });    
    } catch (error) {
        res.status(500).json({
            message: 'Fail',
            error: error.message
        }); 
    };
};

// '/api/tipoTransaccion/all'
exports.retrieveAllTipoTransaccion = (req, res) => {
    TipoTransaccion.findAll()
    .then(tipoTransaccionInfo => {
        res.status(200).json({
            message: "Get all tipoTransacciones. Infos Succesfully!",
            tipoTransaccion: tipoTransaccionInfo
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

// '/api/tipoTransaccion/onebyid/:id'
exports.getTipoTransaccionById = async (req, res) => {
    try {
        const tipoTransaccionId = await TipoTransaccion.findByPk(req.params.id);
        if (!tipoTransaccionId) {
            return res.status(404).json({
                message: 'TipoTransaccion not found'
            });
        }
        res.status(200).json({
            message: 'Get TipoTransaccion by Id',
            tipoTransaccion: tipoTransaccionId
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error!',
            error: error
        });
    }
};

// '/api/tipoTransaccion/update/:id'
exports.updateTipoTransaccionById = async (req, res) => {
    try {
        let tipoTransaccion = {
            descripcion: req.body.descripcion,
        };
        let id = req.params.id;
        let update = await TipoTransaccion.update(tipoTransaccion, {
            where: { id_tipoTransaccion: id }
        });
        if (update == 1) {
            res.status(200).json({
                message: 'TipoTransaccion was updated successfully.'
            });
        } else {
            res.status(404).json({
                message: 'TipoTransaccion not found.'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error : ' + error
        });
    }
};

// '/api/tipoTransaccion/delete/:id'
exports.deleteTipoTransaccionById = async (req, res) => {
    try {
        let id = req.params.id;
        let status = await TipoTransaccion.destroy({
            where: { id_tipoTransaccion: id }
        });
        if (status == 1) {
            res.status(200).json({
                message: 'TipoTransaccion was deleted successfully!'
            });
        } else {
            res.status(404).json({
                message: 'TipoTransaccion not found!'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error : ' + error
        });
    }
};