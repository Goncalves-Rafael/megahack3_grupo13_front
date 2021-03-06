export default {
  checkConnection: function () {
    var networkState = navigator.connection.type
    if (cordova.platformId === 'browser') {
      return networkState !== Connection.NONE
    } else {
      return networkState !== Connection.NONE && networkState !== Connection.UNKNOWN
    }

  },

  getConnection: function () {
    var networkState = navigator.connection.type

    var states = {}
    states[Connection.UNKNOWN] = 'Unknown connection'
    states[Connection.ETHERNET] = 'Ethernet connection'
    states[Connection.WIFI] = 'WiFi connection'
    states[Connection.CELL_2G] = 'Cell 2G connection'
    states[Connection.CELL_3G] = 'Cell 3G connection'
    states[Connection.CELL_4G] = 'Cell 4G connection'
    states[Connection.CELL] = 'Cell generic connection'
    states[Connection.NONE] = 'No network connection'

    return { name: states[networkState], state: networkState }
  }
}
