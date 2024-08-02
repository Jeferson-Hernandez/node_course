export class Tarea {
  id = ''
  desc = ''
  completadoEn = null

  constructor( desc ) {
    this.id = crypto.randomUUID()
    this.desc = desc
    this.completadoEn = null
  }
}