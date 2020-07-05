import database from '../provider/sqlite/database'

export default {
  get (idTurma, idAluno) {
    return new Promise((resolve, reject) => {
      database.getData(
        'SELECT *, l.id id_livro, D.id id_desafio FROM LIVRO l ' +
        ' LEFT JOIN (SELECT * FROM DESAFIO ' +
        '            WHERE tipo = "resenha" AND id_turma = ?) ' +
        '   D ON D.id_livro = l.id ',
        [
          idTurma
        ],
        (result) => resolve(result),
        reject
      )
    })
  },
  getById (id) {
    return new Promise((resolve, reject) => {
      database.getData(
        'SELECT * FROM livro ' +
        ' WHERE id = ?',
        [
          id
        ],
        resolve,
        reject
      )
    })
  },
  getProgresso (idLivro, idUsuario) {
    return new Promise((resolve, reject) => {
      database.getData(
        'SELECT * FROM usuario_livro ' +
        ' WHERE id_livro = ? AND id_usuario = ?',
        [
          idLivro,
          idUsuario
        ],
        resolve,
        reject
      )
    })
  },
  saveProgresso (progresso) {
    return new Promise((resolve, reject) => {
      database.persist({
        inserts: {
          usuario_livro: [progresso]
        }
      },
      resolve,
      reject,
      (arg) => console.log(arg)
      )
    })
  },
  getCapitulo (id) {
    return new Promise((resolve, reject) => {
      database.getData(
        'SELECT * FROM capitulo' +
        ' WHERE id = ? ',
        [
          id
        ],
        (result) => resolve(result),
        reject
      )
    })
  },
  getCapituloPorNumero (idLivro, numeroCapitulo) {
    return new Promise((resolve, reject) => {
      database.getData(
        'SELECT * FROM capitulo' +
        ' WHERE id_livro = ? AND numero_capitulo = ? ',
        [
          idLivro,
          numeroCapitulo
        ],
        (result) => resolve(result),
        reject
      )
    })
  },
  getPaginas (idCapitulo) {
    return new Promise((resolve, reject) => {
      database.getData(
        'SELECT * FROM pagina' +
        ' WHERE id_capitulo = ?',
        [
          idCapitulo
        ],
        (result) => resolve(result),
        reject
      )
    })
  }
}
