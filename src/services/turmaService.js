import database from '../provider/sqlite/database'

export default {
  get (idProfessor) {
    return new Promise((resolve, reject) => {
      database.getData(
        'SELECT * FROM TURMA t ' +
        ' INNER JOIN PROFESSOR_TURMA pt ON pt.id_turma = t.id ' +
        ' WHERE pt.id_professor = ?',
        [
          idProfessor
        ],
        resolve,
        reject
      )
    })
  },
  getById (id) {
    return new Promise((resolve, reject) => {
      database.getData(
        'SELECT * FROM TURMA' +
        ' WHERE id = ? ',
        [
          id
        ],
        resolve,
        reject
      )
    })
  },
  save (turma) {
    return new Promise((resolve, reject) => {
      database.persist({
        inserts: {
          TURMA: [turma]
        }
      },
      resolve,
      reject,
      (arg) => console.log(arg)
      )
    })
  },
  getAlunos () {
    return new Promise((resolve, reject) => {
      database.getData(
        'SELECT * FROM ALUNO',
        null,
        resolve,
        reject
      )
    })
  },
  getAlunosComNotas () {
    return new Promise((resolve, reject) => {
      database.getData(
        'SELECT * FROM ALUNO a ' +
        'LEFT JOIN ' +
        '   (SELECT id_aluno, sum(nota) nota FROM RESPOSTA GROUP BY id_aluno) as r ON a.id = r.id_aluno',
        null,
        resolve,
        reject
      )
    })
  },
  getAlunoById (idAluno) {
    return new Promise((resolve, reject) => {
      database.getData(
        'SELECT * FROM ALUNO ' +
        'WHERE id = ?',
        [
          idAluno
        ],
        resolve,
        reject
      )
    })
  }
}
