import database from '../provider/sqlite/database'
import desafioService from './desafioService'

export default {
  get () {
    return new Promise((resolve, reject) => {
      database.getData(
        'SELECT * FROM desafio_pergunta',
        null,
        resolve,
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
        resolve,
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
          resolve,
          reject,
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
        resolve,
        reject
      )
    })
  }
}
