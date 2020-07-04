import database from '../provider/sqlite/database'
import desafioService from './desafioService'

export default {
  get () {
    return new Promise((resolve, reject) => {
      database.getData(
        'SELECT * FROM desafio_pergunta',
        null,
        (result) => resolve(result),
        reject
      )
    })
  },
  getById (id) {
    return new Promise((resolve, reject) => {
      database.getData(
        'SELECT * FROM desafio_pergunta' +
        ' WHERE id = ? ',
        [
          id
        ],
        (result) => resolve(result),
        reject
      )
    })
  },
  save (pergunta) {
    return new Promise((resolve, reject) => {
      desafioService.getLast()
        .then(result => {
          const desafio = result[0]
          pergunta.id_desafio = desafio.id
          database.persist({
            inserts: {
              desafio_pergunta: [pergunta]
            }
          },
          (result) => {
            debugger
            console.log(result)
            resolve(result)
          },
          (result) => {
            debugger
            console.log(result)
            reject(result)
          },
          (arg) => console.log(arg)
          )
        })
    })
  },
  getLast () {
    return new Promise((resolve, reject) => {
      database.getData(
        'SELECT * FROM DESAFIO' +
        ' ORDER BY ID DESC LIMIT 1',
        null,
        (result) => resolve(result),
        reject
      )
    })
  }
}
