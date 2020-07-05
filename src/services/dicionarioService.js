import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://api.dicionario-aberto.net/',
  timeout: 10000
})

export default {
  findWord (word) {
    return instance.get('/word/' + word)
  },

  findNear (word) {
    return instance.get('/near/' + word)
  }
}
