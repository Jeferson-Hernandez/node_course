const { response } = require('express')
const bcryptjs = require('bcryptjs')

const { generarJWT } = require('../helpers/generar-jwt')
const { googleVerify } = require('../helpers/google-verify')
const Usuario = require('../models/usuario')

const login = async (req, res = response) => {
    const { correo, password } = req.body

    try {
        const usuario = await Usuario.findOne({ correo })
        if (!usuario) {
            return res.status(400).json({
                msg: 'El correo es incorrecto'
            })
        }

        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'El usuario se encuentra inhabilitado'
            })
        }

        const validPassword = bcryptjs.compareSync(password, usuario.password)
        if (!validPassword) {
            return res.status(400).json({
                msg: 'El password es incorrecto'
            })
        }

        const token = await generarJWT(usuario.id)

        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Algo salio mal'
        })
    }
}

const googleSignIn = async(req, res = response) => {
    const { id_token } = req.body

    try {
        const { nombre, img, correo } = await googleVerify(id_token)

        let usuario = await Usuario.findOne({ correo })

        if (!usuario) {
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                rol: 'USER_ROLE',
                google: true
            }

            usuario = new Usuario(data)
            await usuario.save()
        }

        if (!usuario.estado) {
            return res.status(401).json({
                msg: "Hable con el administrador, usuario bloqueado"
            })
        }

        const token = await generarJWT(usuario.id)
        console.log(token)
        
        res.json({
            usuario,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            msg: "El token no se pudo verificar"
        })
    }

}

const renovarToken = async(req, res = response) => {
  const {userAuthenticated} = req
  const token = await generarJWT(userAuthenticated.id)

  res.json({
    userAuthenticated,
    token
  })
}

module.exports = {
    login,
    googleSignIn,
    renovarToken
}