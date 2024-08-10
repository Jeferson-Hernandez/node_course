const { response } = require("express");

const esAdminRole = (req, res = response, next) => {
    if (!req.userAuthenticated) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        })
    }

    const { rol, nombre } = req.userAuthenticated

    if (rol !== 'ADMIN_ROLE') {
        return res.status(400).json({
            msg: `El usuario ${nombre} no es administrador`
        })
    }

    next()
}

const tieneRole = (...roles) => {
    return (req, res = response, next) => {
        if (!req.userAuthenticated) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            })
        }

        if (!roles.includes(req.userAuthenticated.rol)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            })
        }

        next()
    }
}

module.exports = {
    esAdminRole,
    tieneRole
}