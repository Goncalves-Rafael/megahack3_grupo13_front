function writeFile (fileEntry, dataObj) {
  // Create a FileWriter object for our FileEntry (log.txt).
  fileEntry.createWriter(function (fileWriter) {
    fileWriter.onwriteend = function () {
      console.log('finalizou')
    }
    fileWriter.onerror = function (e) {
      console.log('Failed file write: ' + e.toString())
    }
    if (!dataObj) {
      dataObj = new Blob(['some file data'], { type: 'text/plain' })
    }
    fileWriter.write(dataObj)
  })
}

export default {
  saveFile (livro, encripted) {
    window.requestFileSystem(window.LocalFileSystem.PERSISTENT, 0, function (fs) {
      console.log('file system open: ' + fs.name)
      fs.root.getFile(livro.titulo + 'tentativa.txt', { create: true, exclusive: false }, function (fileEntry) {
        writeFile(fileEntry, new Blob([encripted], { type: 'text/plain' }))
      }, (err) => console.log(err))
    }, (err) => console.log(err))
  },

  readFile (fileEntry) {
    fileEntry.file(function (file) {
      var reader = new FileReader()
      reader.onloadend = function () {
        console.log(fileEntry.fullPath + ': ' + this.result)
      }
      reader.readAsText(file)
    }, err => console.log(err))
  }
}
