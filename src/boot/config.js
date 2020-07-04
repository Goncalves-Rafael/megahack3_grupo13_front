import Vue from 'vue'
import database from '../provider/sqlite/database'

document.addEventListener('deviceready', function () {
  console.log('device ready')
  Vue.prototype.$c.DEVICE_READY = true

  // Banco de dados Local
  database.initialize(function () {
    console.log('Created database OK')
  }, function (error) {
    console.log('Transaction ERROR: ' + error.message)
    console.log(error)
  })
})
