// Para las sugerencias
const { response, request } = require('express')

const userGet = (req = request, res = response) => {

    // http://localhost:8080/api/users?q=hola&apikey=dfs22323232&limit=10
    // const { q, nombre = 'No name', apikey, page = 1, limit } = req.query

    res.json({
        msg: 'get API - controlador',
    })
}
const userPost = (req, res = response) => {
    const {nombre, edad} = req.body

    res.json({
        msg: 'Post API - controlador',
        nombre,
        edad
    })
}

const userPut = (req, res = response) => {
    const id = req.params.id
    res.json({
        msg: 'Put API - controlador',
        id
    })
}
const userPatch = (req, res = response) => {
    res.json({
        msg: 'Patch API - controlador'
    })
}
const userDelete = (req, res = response) => {
    res.json({
        msg: 'Delete API - controlador'
    })
}
module.exports = {
    userGet,
    userPost,
    userPut,
    userPatch,
    userDelete
}
