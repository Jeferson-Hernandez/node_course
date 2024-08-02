import inquirer from 'inquirer'
import 'colors'

const menuOpts = [
  {
    type: 'list',
    name: 'opcion',
    message: '¿Qué desea hacer?',
    choices: [
      {
        value: '1',
        name: `${'1.'.green} Crear tarea`
      },
      {
        value: '2',
        name: `${'2.'.green} Listar tareas`
      },
      {
        value: '3',
        name: `${'3.'.green} Listar tareas completadas`
      },
      {
        value: '4',
        name: `${'4.'.green} Listar tareas pendientes`
      },
      {
        value: '5',
        name: `${'5.'.green} Completar tareas(s)`
      },
      {
        value: '6',
        name: `${'6.'.green} Borrar tarea`
      },
      {
        value: '0',
        name: `${'0.'.green} Salir`
      },
    ]
  }
]

const questionOpts = [
  {
    type: 'input',
    name: 'pausa',
    message: `Presione ${ 'Enter'.green } para continuar`  
  }
]

export const inquirerMenu = async() => {
    console.clear()
    console.log('=========================='.rainbow)
    console.log('  Seleccione una opcion'.white)
    console.log('==========================\n'.rainbow)

    const { opcion } = await inquirer.prompt(menuOpts)
    return opcion 
}

export const leerInput = async( message ) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate( value ) {
        if(value.length === 0) {
          return 'Por favor ingrese un valor'
        }
        return true
      }
    }
  ]

  const { desc } = await inquirer.prompt(question)
  return desc
}

export const listadoTareasBorrar = async( tareas = [] ) => {

  const choices = tareas.map((tarea, index) => {
    const idx = `${index+1}.`.green
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`
    }
  })

  choices.unshift({
    value: '0',
    name: '0.'.green + ' Cancelar'
  })

  const preguntas = [
    {
      type: 'list',
      name: 'id',
      message: 'Borrar',
      choices
    }
  ]

  const { id } = await inquirer.prompt(preguntas)
  return id
}

export const mostrarListadoChecklist = async( tareas = [] ) => {

  const choices = tareas.map((tarea, index) => {
    return {
      value: tarea.id,
      name: `${tarea.desc}`,
      checked: (tarea.completadoEn) ? true : false
    }
  })

  const preguntas = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Selecciones',
      choices
    }
  ]

  const { ids } = await inquirer.prompt(preguntas)
  return ids
}

export const confirmar = async( message ) => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message
    }
  ]

  const { ok } = await inquirer.prompt(question)
  return ok
}

export const pausa = async() => {
  console.log('\n')
  const question = await inquirer.prompt(questionOpts)
  return question 
}