import database from '../provider/sqlite/database'

export default {
  get () {
    return new Promise((resolve, reject) => {
      database.getData(
        'SELECT d.id, d.id_turma, d.tipo, d.data_limite, d.pontos, dp.pergunta, d.id_livro, dp.pagina, l.titulo ' +
        ' FROM DESAFIO as d ' +
        ' LEFT JOIN desafio_pergunta as dp ON d.id = dp.id_desafio' +
        ' LEFT JOIN livro as l ON d.id_livro = l.id',
        null,
        (result) => resolve(result),
        reject
      )
    })
  },
  getById (id) {
    return new Promise((resolve, reject) => {
      database.getData(
        'SELECT * FROM DESAFIO ' +
        ' WHERE id = ?',
        [id],
        resolve,
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
  getPerguntas (idLivro, idAluno, idTurma) {
    return new Promise((resolve, reject) => {
      database.getData(
        'SELECT *, d.id id_desafio FROM (SELECT * FROM DESAFIO WHERE id_turma = ?) d ' +
        'INNER JOIN DESAFIO_PERGUNTA p ON p.id_desafio = d.id ' +
        'LEFT JOIN (SELECT * FROM RESPOSTA WHERE id_aluno = ?) r ON r.id_desafio = p.id ' +
        ' WHERE d.id_livro = ?',
        [
          idTurma,
          idAluno,
          idLivro
        ],
        (result) => resolve(result),
        reject
      )
    })
  },
  getPergunta (idDesafio) {
    return new Promise((resolve, reject) => {
      database.getData(
        ' SELECT * FROM DESAFIO d ' +
        ' INNER JOIN DESAFIO_PERGUNTA p ON p.id_desafio = d.id ' +
        ' WHERE d.id = ?',
        [
          idDesafio
        ],
        (result) => resolve(result),
        reject
      )
    })
  },
  getPerguntasTurma (idTurma) {
    return new Promise((resolve, reject) => {
      database.getData(
        'SELECT *, d.id id_desafio FROM DESAFIO d ' +
        'INNER JOIN DESAFIO_PERGUNTA p ON p.id_desafio = d.id ' +
        'INNER JOIN LIVRO l ON d.id_livro = l.id ' +
        ' WHERE d.id_turma = ?',
        [
          idTurma
        ],
        (result) => resolve(result),
        reject
      )
    })
  },
  getResenhas (idTurma) {
    return new Promise((resolve, reject) => {
      database.getData(
        'SELECT *, d.id id_desafio FROM DESAFIO d ' +
        'INNER JOIN LIVRO l ON d.id_livro = l.id ' +
        ' WHERE d.tipo = "resenha" AND d.id_turma = ?',
        [
          idTurma
        ],
        resolve,
        reject
      )
    })
  },
  getResenhasPorAluno (idALuno) {
    return new Promise((resolve, reject) => {
      database.getData(
        'SELECT * FROM DESAFIO d ' +
        ' INNER JOIN RESPOSTA r ON r.id_desafio = d.id ' +
        ' WHERE d.tipo = "resenha" AND r.id_aluno = ?',
        [
          idALuno
        ],
        resolve,
        reject
      )
    })
  },
  getAlunosComRespostas (idDesafio) {
    return new Promise((resolve, reject) => {
      database.getData(
        'SELECT * FROM ALUNO a ' +
        'LEFT JOIN (SELECT r.* FROM RESPOSTA r INNER JOIN DESAFIO d ON r.id_desafio = d.id ' +
        'WHERE d.id = ?) AS r ON r.id_aluno = a.id ',
        [
          idDesafio
        ],
        (result) => resolve(result),
        reject
      )
    })
  },
  salvarResposta (resposta) {
    return new Promise((resolve, reject) => {
      database.persist({
        inserts: {
          resposta: [resposta]
        }
      },
      resolve,
      reject,
      (arg) => console.log(arg)
      )
    })
  },
  salvarResenha (resenha) {
    return new Promise((resolve, reject) => {
      database.persist({
        inserts: {
          resenha: [resenha]
        }
      },
      resolve,
      reject,
      (arg) => console.log(arg)
      )
    })
  },
  salvarNota (idDesafio, idAluno, nota) {
    return new Promise((resolve, reject) => {
      database.executeSql(
        'UPDATE RESPOSTA SET nota = ? ' +
        'WHERE id_desafio = ? AND id_aluno = ? ',
        [
          nota, idDesafio, idAluno
        ],
        resolve,
        reject
      )
    })
  }
}
