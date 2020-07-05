import CryptoJS from 'crypto-js'
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
        resolve,
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
  getCapitulos (idLivro) {
    return new Promise((resolve, reject) => {
      database.getData(
        'SELECT * FROM capitulo' +
        ' WHERE id_livro = ? ',
        [
          idLivro
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
        resolve,
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
        resolve,
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
        resolve,
        reject
      )
    })
  },
  saveLivro (livro, capitulos, paginas) {
    return new Promise((resolve, reject) => {
      database.persist({
        inserts: {
          livro: [livro],
          capitulo: capitulos,
          pagina: paginas
        }
      },
      resolve,
      reject,
      (arg) => console.log(arg)
      )
    })
  },
  delete (id) {
    return new Promise((resolve, reject) => {
      database.executeSql(
        'DELETE FROM LIVRO ' +
        'WHERE id = ? ',
        [
          id
        ],
        resolve,
        reject
      )
    })
  },
  getEncryptedBook (livro) {
    return CryptoJS.AES.encrypt(JSON.stringify(livro), 'token').toString()
  },
  decryptBook (encriptedBook) {
    const bytes = CryptoJS.AES.decrypt(encriptedBook, 'token')
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  }
}
