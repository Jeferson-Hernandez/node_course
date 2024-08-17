const { response, request } = require("express");
const { Categoria } = require("../models");

const obtenerCategorias = async (req = request, res = response) => {
  const { limit = 5, skip = 0 } = req.query

  const [total, categorias] = await Promise.all([
    Categoria.countDocuments({ estado: true }),
    Categoria.find({ estado: true })
      .populate("usuario", "nombre correo")
      .skip(skip)
      .limit(limit)
  ])

  res.json({
    categorias,
    total
  })
}

const obtenerCategoria = async (req = request, res = response) => {
  const { id } = req.params
  const categoria = await Categoria.findById(id).populate("usuario", "nombre correo")

  res.json(categoria)
}

const crearCategoria = async (req = request, res = response) => {
  const nombre = req.body.nombre.toUpperCase()

  const categoriaDB = await Categoria.findOne({ nombre })

  if (categoriaDB) {
    return res.status(400).json({
      msg: `La categoria ${categoriaDB.nombre}, ya existe`
    })
  }

  const data = {
    nombre,
    usuario: req.userAuthenticated._id
  }

  const categoria = new Categoria(data)

  await categoria.save()
  res.status(201).json(categoria)
}

const actualizarCategoria = async (req = request, res = response) => {
  const { id } = req.params
  const nombre = req.body.nombre.toUpperCase()

  const data = {
    nombre,
    usuario: req.userAuthenticated._id
  }

  const categoria = await Categoria.findOneAndUpdate({ _id: id }, data, { returnDocument: 'after' })

  res.json(categoria)
}

const borrarCategoria = async(req = request, res = response) => {
  const { id } = req.params

  const categoria = await Categoria.findOneAndUpdate({ _id: id}, {estado: false}, { returnDocument: 'after'})

  res.json(categoria)
}

module.exports = {
  actualizarCategoria,
  crearCategoria,
  borrarCategoria,
  obtenerCategorias,
  obtenerCategoria
}