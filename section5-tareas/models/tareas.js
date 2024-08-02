import colors from 'colors/index.js'
import { Tarea } from "./tarea.js"

export class Tareas {
  _listado = {}
  
  
  constructor() {
    this._listado = {}
  }
  
  get listadoArr() {
    const listado = []
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key]
      listado.push( tarea )
    })
    return listado
  };

  cargarTareasFromArray( tareas = [] ) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea
    })
  }

  crearTarea( desc = '') {
    const tarea = new Tarea(desc)
    this._listado[tarea.id] = tarea
  }

  borrarTarea( id = '' ) {
    if ( this._listado[id] ){
      delete this._listado[id]
    }
  }

  listadoCompleto() {
    console.log()
    this.listadoArr.forEach((tarea, index) => {
      console.log(`${colors.green(index+1)} ${tarea.desc} :: ${tarea.completadoEn ? "Completado".green : "Pendiente".red}`)
    })
  }

  listarPendientesCompletadas( completadas = true ) {
    console.log()
    const tareas = this.listadoArr.filter((tarea) => completadas ? tarea.completadoEn : !tarea.completadoEn)

    tareas.forEach((tarea, index) => {
      console.log(`${colors.green(index+1)} ${tarea.desc} :: ${tarea.completadoEn ? tarea.completadoEn.green : "Pendiente".red}`)
    })   
  }

  toggleCompletadas( ids = [] ) {
    ids.forEach( id => {
      const tarea = this._listado[id]
      if ( !tarea.completadoEn ) {
        tarea.completadoEn = new Date().toISOString()
      }
    })

    this.listadoArr.forEach((tarea) => {
      if ( !ids.includes(tarea.id) ) {
        this._listado[tarea.id].completadoEn = null
      }
    })
  }
}