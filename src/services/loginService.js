import { LocalStorage } from 'quasar'
import database from '../provider/sqlite/database'
import axios from 'axios'

export default {
  login (credentials) {
    return this.offlineLogin(credentials)
  },
  onlineLogin (credentials) {
    // Define login params
    var params = {
      data: credentials
    }
    // Try login
    return new Promise((resolve, reject) => {
      axios.post('/login', params).then((response) => {
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  },
  offlineLogin ({ email, senha }) {
    return new Promise((resolve, reject) => {
      try {
        this.dbAuth(email, senha)
          .then(response => {
            document.cookie = 'rememberMe=true'
            LocalStorage.set('default_auth_token', response.token)
            delete response.token
            LocalStorage.set('userData', response)
            resolve(response)
          })
      } catch (error) {
        reject(error)
      }
    })
  },
  logout () {
    LocalStorage.remove('default_auth_token')
  },
  dbAuth (email, senha) {
    return new Promise((resolve, reject) => {
      database.getData(
        'SELECT * FROM USUARIO WHERE email = ? AND senha = ?', [email, senha],
        function (results) {
          if (results[0]) {
            delete results[0].password
            resolve(results[0])
          } else reject(new Error('Usuário não encontrado localmente. Verifique usuário/senha ou tente conectar-se a internet'))
        },
        function (error) {
          reject(error)
        })
    })
  },
  saveUserData (usuario) {
    return new Promise((resolve, reject) => {
      database.persist({
        inserts: {
          USUARIO: [usuario]
        }
      }, function () {
        resolve(usuario)
      }, (error) => {
        console.log(error)
        reject(error)
      })
    })
  }
}
