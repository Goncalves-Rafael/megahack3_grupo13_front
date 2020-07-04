<template>
  <div id="pagina--container q-pa-md" v-if="paginaAtual && paginaAtual.conteudo">
    <q-card>
      <q-card-section v-if="progresso.pagina_atual === capitulo.numero_pagina_inicial" class="text h5">
        {{ capitulo.titulo }}
      </q-card-section>
      <q-card-section style="min-height: 75vh;">
        {{ paginaAtual.conteudo }}
      </q-card-section>
      <q-card-actions align="around">
        <q-btn
          icon="fa fa-chevron-left"
          flat
          v-if="progresso.pagina_atual > 1"
          @click="paginaAnterior"
          :loading="carregando" />
        <q-btn
          icon="fa fa-chevron-right"
          flat
          v-if="progresso.pagina_atual < livro.numero_paginas"
          @click="paginaSeguinte"
          :loading="carregando" />
      </q-card-actions>
    </q-card>
    <q-dialog v-if="perguntaAtual" v-model="showPergunta" persistent transition-show="scale">
     <q-card>
      <q-item v-ripple>
        <q-item-section side>
          <q-avatar rounded size="48px">
            <img src="https://lh3.googleusercontent.com/MKFOXKJRiXkd1VfeU8qX38zjMnMmut3UppdYTXcOHKRkVvmfk-ECy7pd3de6kTz5Sq4" />
            <q-badge floating color="red">Pergunta</q-badge>
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>Rafael</q-item-label>
          <q-item-label caption>Tenho uma pergunta para você</q-item-label>
        </q-item-section>
        <q-item-section side>
          {{ perguntaAtual.pontos }} pontos
        </q-item-section>
      </q-item>
      <q-card-section>
        <div class="text-h6">
          {{ perguntaAtual.pergunta }}
        </div>
        <q-input
          v-model="respostaAtual"
          filled
          type="textarea"
          label="Digite aqui sua resposta"
          stack-label
        />
      </q-card-section>
      <q-card-actions class="q-px-md">
        <q-btn color="secondary">
          Salvar
        </q-btn>
      </q-card-actions>
     </q-card>
    </q-dialog>
  </div>
</template>

<script>
import livroService from '../services/livroService'
import desafioService from '../services/desafioService'

export default {
  name: 'leitura',
  data () {
    return {
      livro: null,
      capitulo: null,
      paginas: [],
      perguntas: [],
      respostas: [],
      progresso: {
        pagina_atual: null
      },
      carregando: false,
      perguntaAtual: null,
      respostaAtual: null,
      showPergunta: false
    }
  },
  computed: {
    idLivro () {
      return this.$route.params.id
    },
    usuario () {
      return JSON.parse(localStorage.getItem('usuario'))
    },
    paginaAtual () {
      return this.paginas.find(p => p.numero_pagina === this.progresso.pagina_atual)
    }
  },
  watch: {
    capitulo: {
      handler (newVal, oldVal) {
        this.getPaginas()
      },
      deep: true
    },
    paginaAtual (newVal, oldVal) {
      const pergunta = this.perguntas.find(p => p.pagina === newVal.numero_pagina)
      if (pergunta) {
        this.perguntaAtual = pergunta
        this.showPergunta = true
      }
    }
  },
  mounted () {
    this.getLivro()
    this.getProgresso()
    this.getPerguntas()
  },
  methods: {
    getLivro () {
      livroService.getById(this.idLivro)
        .then(result => {
          this.livro = result[0]
        })
    },
    getProgresso () {
      livroService.getProgresso(this.idLivro, this.usuario.id)
        .then(result => {
          if (result == null || result.length === 0) {
            this.progresso = {
              id_livro: this.idLivro,
              id_capitulo: null,
              id_usuario: this.usuario.id,
              pagina_atual: null,
              data_inicio: new Date(),
              data_fim: null
            }
            this.iniciarLeitura()
          } else {
            this.progresso = result[0]
            this.getProgressoCapitulo()
          }
        })
    },
    getProgressoCapitulo () {
      livroService.getCapitulo(this.progresso.id_capitulo)
        .then(result => {
          this.capitulo = result[0]
        })
    },
    getCapitulo (numeroCapitulo) {
      livroService.getCapituloPorNumero(this.idLivro, numeroCapitulo)
        .then(result => {
          this.capitulo = result[0]
        })
    },
    iniciarLeitura () {
      livroService.getCapituloPorNumero(this.idLivro, 1)
        .then(result => {
          this.capitulo = result[0]
          this.progresso.id_capitulo = this.capitulo.id
          this.progresso.pagina_atual = this.capitulo.numero_pagina_inicial
        })
    },
    getPaginas () {
      livroService.getPaginas(this.capitulo.id)
        .then(result => {
          this.paginas = result
        })
    },
    paginaSeguinte () {
      if (this.progresso.pagina_atual === this.capitulo.numero_pagina_final) {
        this.getCapitulo(this.capitulo.numero_capitulo + 1)
      }
      this.progresso.pagina_atual++
    },
    paginaAnterior () {
      if (this.progresso.pagina_atual === this.capitulo.numero_pagina_inicial) {
        this.getCapitulo(this.capitulo.numero_capitulo - 1)
      }
      this.progresso.pagina_atual--
    },
    getPerguntas () {
      desafioService.getPerguntas(this.idLivro)
        .then(result => {
          this.perguntas = result
        })
    }
  }
}
</script>

<style>

</style>
