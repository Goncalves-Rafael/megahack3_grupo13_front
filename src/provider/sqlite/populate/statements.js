export default {
  creates () {
    return [
      'CREATE TABLE IF NOT EXISTS [usuario] ( ' +
      '  [id] INTEGER PRIMARY KEY AUTOINCREMENT, ' +
      '  [email] VARCHAR NOT NULL, ' +
      '  [senha] VARCHAR NOT NULL, ' +
      '  [token] VARCHAR NOT NULL, ' +
      '  [papel] VARCHAR NOT NULL); ',

      'CREATE TABLE IF NOT EXISTS [escola] ( ' +
      '  [id] INTEGER PRIMARY KEY AUTOINCREMENT, ' +
      '  [nome] VARCHAR NOT NULL, ' +
      '  [cidade] VARCHAR NOT NULL, ' +
      '  [uf] VARCHAR NOT NULL, ' +
      '  [endereco] VARCHAR NOT NULL, ' +
      '  [cep] VARCHAR); ',

      'CREATE TABLE IF NOT EXISTS [turma] ( ' +
      '  [id] INTEGER PRIMARY KEY AUTOINCREMENT, ' +
      '  [id_escola] INTEGER NOT NULL REFERENCES ESCOLA([id]), ' +
      '  [nome] VARCHAR, ' +
      '  [nivel] VARCHAR, ' +
      '  [serie] INTEGER NOT NULL); ',

      'CREATE TABLE IF NOT EXISTS [aluno] ( ' +
      '  [id] INTEGER NOT NULL REFERENCES USER([id]), ' +
      '  [idade] INTEGER NOT NULL, ' +
      '  [nome] VARCHAR NOT NULL, ' +
      '  [sexo] VARCHAR, ' +
      '  [id_turma] INTEGER REFERENCES TURMA([id]), ' +
      '  [pontuacao] INTEGER DEFAULT 0); ',

      'CREATE TABLE IF NOT EXISTS [professor] ( ' +
      '  [id] INTEGER REFERENCES USER([id]), ' +
      '  [idade] INTEGER, ' +
      '  [nome] VARCHAR NOT NULL, ' +
      '  [sexo] VARCHAR, ' +
      '  [materia] VARCHAR NOT NULL); ',

      'CREATE TABLE IF NOT EXISTS [professor_turma] ( ' +
      '  [id_professor] INTEGER NOT NULL REFERENCES PROFESSOR([id]), ' +
      '  [id_turma] INTEGER NOT NULL REFERENCES TURMA([id])); ',

      'CREATE TABLE IF NOT EXISTS [livro] ( ' +
      '  [id] INTEGER PRIMARY KEY AUTOINCREMENT, ' +
      '  [titulo] VARCHAR NOT NULL, ' +
      '  [data_publicacao] timestamp, ' +
      '  [autor] VARCHAR NOT NULL, ' +
      '  [genero] VARCHAR NOT NULL, ' +
      '  [numero_paginas] INT NOT NULL, ' +
      '  [editora] VARCHAR, ' +
      '  [capa] VARCHAR); ',

      'CREATE TABLE IF NOT EXISTS [capitulo] ( ' +
      '  [id] INTEGER PRIMARY KEY AUTOINCREMENT, ' +
      '  [id_livro] INT NOT NULL REFERENCES LIVRO([id]), ' +
      '  [titulo] VARCHAR, ' +
      '  [numero_capitulo] INT NOT NULL, ' +
      '  [numero_pagina_inicial] INT NOT NULL, ' +
      '  [numero_pagina_final] INT NOT NULL); ',

      'CREATE TABLE IF NOT EXISTS [pagina] ( ' +
      '  [id] INTEGER PRIMARY KEY AUTOINCREMENT, ' +
      '  [id_capitulo] INT NOT NULL REFERENCES CAPITULO([id]), ' +
      '  [conteudo] VARCHAR, ' +
      '  [numero_pagina] INT NOT NULL); ',

      'CREATE TABLE IF NOT EXISTS [usuario_livro] ( ' +
      '  [id] INTEGER PRIMARY KEY AUTOINCREMENT, ' +
      '  [id_livro] INTEGER NOT NULL REFERENCES LIVRO([id]), ' +
      '  [id_capitulo] INTEGER NOT NULL REFERENCES LIVRO([id]), ' +
      '  [id_usuario] INTEGER NOT NULL REFERENCES ALUNO([id]), ' +
      '  [pagina_atual] INTEGER DEFAULT 1, ' +
      '  [data_inicio] timestamp NOT NULL, ' +
      '  [data_fim] timestamp); ',

      'CREATE TABLE IF NOT EXISTS [desafio] ( ' +
      '  [id] INTEGER PRIMARY KEY AUTOINCREMENT, ' +
      '  [id_professor] INTEGER NOT NULL REFERENCES PROFESSOR([id]), ' +
      '  [id_turma] INTEGER NOT NULL REFERENCES TURMA([id]), ' +
      '  [id_livro] INTEGER NOT NULL REFERENCES LIVRO([id]), ' +
      '  [data_inicio] timestamp NOT NULL, ' +
      '  [data_limite] timestamp NOT NULL, ' +
      '  [tipo] VARCHAR NOT NULL, ' +
      '  [sincronizado] INTEGER DEFAULT 0, ' +
      '  [pontos] INTEGER DEFAULT 0); ',

      'CREATE TABLE IF NOT EXISTS [desafio_pergunta] ( ' +
      '  [id] INTEGER PRIMARY KEY AUTOINCREMENT, ' +
      '  [id_desafio] INTEGER NOT NULL REFERENCES DESAFIO([id]), ' +
      '  [pergunta] VARCHAR NOT NULL, ' +
      '  [pagina] INTEGER DEFAULT 0); ',

      'CREATE TABLE IF NOT EXISTS [resposta] ( ' +
      '  [id] INTEGER PRIMARY KEY AUTOINCREMENT, ' +
      '  [id_aluno] INTEGER NOT NULL REFERENCES ALUNO([id]), ' +
      '  [id_desafio] INTEGER NOT NULL REFERENCES DESAFIO([id]), ' +
      '  [titulo] VARCHAR, ' +
      '  [resposta] VARCHAR DEFAULT "Sem resposta", ' +
      '  [sincronizado] INTEGER DEFAULT 0, ' +
      '  [nota] INTEGER); ',

      'CREATE TABLE IF NOT EXISTS [resenha] ( ' +
      '  [id] INTEGER PRIMARY KEY AUTOINCREMENT, ' +
      '  [id_aluno] INTEGER NOT NULL REFERENCES ALUNO([id]), ' +
      '  [id_desafio] INTEGER NOT NULL REFERENCES DESAFIO([id]), ' +
      '  [titulo] VARCHAR, ' +
      '  [resenha] VARCHAR DEFAULT "Sem resposta", ' +
      '  [sincronizado] INTEGER DEFAULT 0, ' +
      '  [nota] INTEGER); '
    ]
  },
  indexs () {
    return []
  }
}
