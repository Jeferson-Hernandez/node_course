const { response, request } = require('express')
const jwt = require('jsonwebtoken')

const Usuario = require('../models/usuario')

const validarJWT = async(req = request, res = response, next) => {
    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        const userAuthenticated = await Usuario.findById(uid)

        if (!userAuthenticated) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe'
            })
        }

        if (!userAuthenticated.estado) {
            return res.status(401).json({
                msg: 'Token no valido - usuario inactivo'
            })
        }

        req.userAuthenticated = userAuthenticated
        next()
    } catch (error) {
        // console.log(error)       
        res.status(401).json({
            msg: "Token no valido"
        })
    }
}

module.exports = {
    validarJWT
}