import axios from 'axios'
import database from '../provider/sqlite/database'

const instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000
})

export default {
  getLivros () {
    return instance.get('/livros')
  },

  baixarDesafios (idTurma) {
    instance.get(`/desafios/${idTurma}`)
      .then(result => {
        console.log(result)
        // TODO atualizar local
      })
  },

  checkSincronismoAluno () {
    return new Promise((resolve, reject) => {
      database.executeSql(
        'SELECT * FROM RESPOSTA WHERE SINCRONIZADO = 0;',
        null,
        resolve,
        reject
      )
    })
  },

  checkSincronismoProfessor () {
    return new Promise((resolve, reject) => {
      database.executeSql(
        'SELECT * FROM DESAFIO WHERE SINCRONIZADO = 0;',
        null,
        resolve,
        reject
      )
    })
  }
}
