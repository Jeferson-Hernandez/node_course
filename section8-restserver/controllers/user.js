// Para las sugerencias
const { response, request } = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/usuario')

const userGet = async(req = request, res = response) => {
    // http://localhost:8080/api/users?q=hola&apikey=dfs22323232&limit=10
    // const { q, nombre = 'No name', apikey, page = 1, limit } = req.query
    const { limit = 5, skip = 0} = req.query

    // const usuarios = await Usuario.find({ estado: true })
    //     .skip(Number(skip))
    //     .limit(Number(limit))

    // const total = await Usuario.countDocuments({ estado: true })

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments({estado: true}),
        Usuario.find({estado: true})
            .skip(Number(skip))
            .limit(Number(limit))
    ])

    res.json({
        total,
        usuarios
    })
}
const userPost = async(req, res = response) => {
    const { nombre, correo, password, rol } = req.body
    const usuario = new Usuario({ nombre, correo, password, rol})

    const salt = bcrypt.genSaltSync(10)
    usuario.password = bcrypt.hashSync(password, salt)

    await usuario.save()

    res.json({
        msg: 'Post API - controlador',
        usuario
    })
}

const userPut = async(req, res = response) => {
    const { id } = req.params
    const { _id, password, google, ...rest } = req.body

    if (password) {
        const salt = bcrypt.genSaltSync(10)
        rest.password = bcrypt.hashSync(password, salt)
    }

    const user = await Usuario.findOneAndUpdate({_id: id}, rest, {returnDocument: 'after'})

    res.json(user)
}

const userPatch = (req, res = response) => {
    res.json({
        msg: 'Patch API - controlador'
    })
}

const userDelete = async(req, res = response) => {
    const { id } = req.params
    // borrado fisicamente de la base de datos
    // const usuario = await Usuario.findByIdAndDelete(id)

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false }, {returnDocument: 'after'})

    res.json(usuario)
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userPatch,
    userDelete
}
