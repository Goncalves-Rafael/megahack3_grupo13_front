/* eslint-disable camelcase */
import statements from './populate/statements'
import livro from './seeds/livro'
import capitulo from './seeds/capitulo'
import pagina from './seeds/pagina'
import usuario from './seeds/user'
import aluno from './seeds/alunos'
import professor from './seeds/professor'
import professor_turma from './seeds/professor_turma'
import turma from './seeds/turma'

// import { Platform } from 'quasar'

export default {

  db: null,
  dbname: 'kriart_store.db',

  initialize (success, error) {
    // const isBrowser = (!Platform.is.mobile)
    // if (isBrowser) {
    this.db = window.openDatabase(this.dbname, '1.0', 'Arvore_Local', 5 * 1024 * 1024)
    // } else {
    //   this.db = window.sqlitePlugin.openDatabase({ name: this.dbname, location: 'default' })
    // }
    this.createOrUpdateTables(success, error)
  },

  createOrUpdateTables (success, error) {
    this.db.transaction(function (tx) {
      const creates = statements.creates()
      let len = creates.length
      for (let i = 0; i < len; i++) {
        tx.executeSql(creates[i])
      }
      const indexs = statements.indexs()
      len = indexs.length
      for (let i = 0; i < len; i++) {
        tx.executeSql(indexs[i])
      }
    }, function (err) {
      console.log('Transaction ERROR: ' + error.message)
      error(err)
    }, function () {
      console.log('Created database OK')
      this.checkSeeded()
        .then(result => {
          if (result == null || result.length === 0) {
            this.seed()
          }
        })
        .finally(success)
    }.bind(this))
  },

  importData (data, success, error, progress) {
    const json = {
      data: { inserts: data }
    }
    cordova.plugins.sqlitePorter.importJsonToDb(this.db, json, {
      successFn: success,
      errorFn: error,
      progressFn: progress,
      batchInsertSize: 500
    })
  },

  deleteData (table, data, success, error, progress) {
    const json = {
      data: { deletes: data }
    }
    cordova.plugins.sqlitePorter.importJsonToDb(this.db, json, {
      successFn: success,
      errorFn: error,
      progressFn: progress,
      batchInsertSize: 500
    })
  },

  persist (data, resolve, reject, progress) {
    const json = {
      data
    }
    cordova.plugins.sqlitePorter.importJsonToDb(this.db, json, {
      successFn: resolve,
      errorFn: reject,
      progressFn: progress,
      batchInsertSize: 500
    })
  },

  getData (query, params, success, error) {
    this.db.transaction(function (tx) {
      tx.executeSql(query, params, function (tx, results) {
        const len = results.rows.length
        const lista = []
        for (let i = 0; i < len; i++) {
          lista.push(results.rows.item(i))
        }
        success(lista)
      }, function (tx, err) {
        error(err)
      })
    })
  },

  executeSql (query, params, success, error) {
    this.db.transaction(function (tx) {
      tx.executeSql(query, params, function (tx, results) {
        if (success) { success(results) }
      }, function (err) {
        if (err) { error(err) }
      })
    })
  },

  checkSeeded () {
    return new Promise((resolve, reject) => {
      this.getData(
        'SELECT * FROM usuario',
        null,
        resolve,
        reject
      )
    })
  },

  seed () {
    return new Promise((resolve, reject) => {
      const json = {
        usuario,
        livro,
        capitulo,
        pagina,
        aluno,
        professor,
        turma,
        professor_turma
      }
      this.persist({
        inserts: json
      },
      resolve,
      reject,
      (arg) => console.log(arg)
      )
    })
  }

}
