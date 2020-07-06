# Heróis da Leitura (Desafio da Árvore)


   Repositório referente ao aplicativo Heróis da Leitura desenvolvido como solução ao desafio da Árvore da Leitura durante o MegaHack 3.0. Para o desenvolvimento da solução utilizamos o framework Quasar baseado em Vue.js com o Apache Cordova como plugin para portar para android. Com o objetivo de manter as funcionalidades mesmo sem conexão utilizamos a biblioteca sqlite para a criação de um banco de dados no dispositivo, assim foi possível armazenar os dados necessários para não impedir o fluxo de cada usuário.
   
   Para adicionar a possibilidade dos alunos retirarem suas dúvidas sobre as definições de palavras utilizamos a API [dicionário-aberto.](https://api.dicionario-aberto.net/index.html)

## Dependencies
quasar-cli
cordova-cli

## Install the dependencies
```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev -m cordova -T [browser|android]
```

### Lint the files
```bash
npm run lint
```

### Build the app for production
```bash
quasar build -m cordova -T android
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).
