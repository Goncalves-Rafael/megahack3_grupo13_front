import database from '../provider/sqlite/database'

export default {
  getAlunoById (idAluno) {
    return new Promise((resolve, reject) => {
      database.getData(
        'SELECT *, a.nome nome_aluno, t.nome nome_turma FROM ALUNO a ' +
        ' INNER JOIN TURMA t ON a.id_turma = t.id ' +
        'WHERE a.id = ?',
        [
          idAluno
        ],
        (result) => resolve(result),
        reject
      )
    })
  },
  getAlunoRespostas (idAluno) {
    return new Promise((resolve, reject) => {
      database.getData(
        'SELECT * FROM RESPOSTA r ' +
        ' INNER JOIN DESAFIO d ON r.id_desafio = d.id ' +
        'WHERE r.id_aluno = ?',
        [
          idAluno
        ],
        (result) => resolve(result),
        reject
      )
    })
  }
}
