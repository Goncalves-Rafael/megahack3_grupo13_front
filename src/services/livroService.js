import database from '../provider/sqlite/database'

export default {
  get () {
    return new Promise((resolve, reject) => {
      database.getData(
        'SELECT * FROM livro',
        null,
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
