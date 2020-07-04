import database from '../provider/sqlite/database'

export default {
  get () {
    return new Promise((resolve, reject) => {
      database.getData(
        'SELECT d.id, d.id_turma, d.tipo, d.data_limite, d.pontos, dp.pergunta, dp.id_livro, dp.pagina, l.titulo ' +
        ' FROM DESAFIO as d ' +
        ' LEFT JOIN desafio_pergunta as dp ON d.id = dp.id_desafio' +
        ' LEFT JOIN livro as l ON dp.id_livro = l.id',
        null,
        (result) => resolve(result),
        reject
      )
    })
  },
  getById (id) {
    return new Promise((resolve, reject) => {
      database.getData(
        'SELECT * FROM DESAFIO' +
        ' WHERE id = ? ',
        [
          id
        ],
        (result) => resolve(result),
        reject
      )
    })
  },
  save (desafio) {
    return new Promise((resolve, reject) => {
      database.persist({
        inserts: {
          desafio: [desafio]
        }
      },
      resolve,
      reject,
      (arg) => console.log(arg)
      )
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
  },
  getPerguntas (idLivro) {
    return new Promise((resolve, reject) => {
      database.getData(
        'SELECT * FROM DESAFIO d ' +
        'INNER JOIN DESAFIO_PERGUNTA p ON p.id_desafio = d.id ' +
        ' WHERE p.id_livro = ?',
        [
          idLivro
        ],
        (result) => resolve(result),
        reject
      )
    })
  },
  getPerguntasTurma (idTurma) {
    return new Promise((resolve, reject) => {
      database.getData(
        'SELECT * FROM DESAFIO d ' +
        'INNER JOIN DESAFIO_PERGUNTA p ON p.id_desafio = d.id ' +
        ' WHERE d.id_turma = ?',
        [
          idTurma
        ],
        (result) => resolve(result),
        reject
      )
    })
  }
}
