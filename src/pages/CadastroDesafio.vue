<template>
  <div class="q-pa-md">
    <q-stepper
      v-model="step"
      vertical
      color="primary"
      animated
    >
      <q-step
        :name="1"
        title="Selecione a categoria para o desafio"
        icon="settings"
        :done="step > 1"
      >
        <div class="row">
          <q-btn
            @click="tipo = 'pergunta'"
            class="col"
            icon="fa fa-rocket"
            :text-color="tipo == 'pergunta' ? 'white' : 'black'"
            :color="tipo == 'pergunta' ? 'secondary' : 'white'"
            label="Perguntas e Respostas" />
          <q-btn
            @click="tipo = 'resenha'"
            class="col"
            icon="fa fa-rocket"
            :text-color="tipo == 'resenha' ? 'white' : 'black'"
            :color="tipo == 'resenha' ? 'secondary' : 'white'"
            label="Escreva uma Resenha" />
        </div>

        <q-stepper-navigation>
          <q-btn @click="step = 2" color="primary" label="Selecionar" />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="2"
        title="Selecionar livro"
        icon="create_new_folder"
        :done="step > 2"
      >
        <q-select
          filled
          v-model="livro"
          use-input
          clearable
          input-debounce="20"
          :options="filterLivros"
          :option-label="'titulo'"
          @filter="filterFn"
          style="width: 250px"
          label="Selecione o livro"
        />
        <q-card v-if="livro != null" class="livro-card">
          <q-card-section horizontal>
            <q-card-section>
              <div class="text-h6">{{ livro.titulo }}</div>
              <div class="text-subtitle2">{{ livro.autor }}</div>
            </q-card-section>
            <img :src="livro.capa" style="max-width: 10rem;">
          </q-card-section>
        </q-card>

        <q-stepper-navigation>
          <q-btn @click="step = 3" color="primary" label="Continue" :disable="livro == null"/>
          <q-btn flat @click="step = 1" color="primary" label="Voltar" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="3"
        title="Preencha os dados do desafio"
        icon="assignment"
        :done="step > 3"
      >
        <div v-if="tipo === 'pergunta'">
          <div class="text-h6">Pergunta</div>
          Crie uma questão desafio para o aluno responder durante a leitura.
          <q-form>
            <q-input v-model="pergunta" placeholder="Escreva aqui a pergunta"
              :rules="[val => (val != null && val.length > 0) || 'Favor preencher a pergunta']"
            />
            <q-input
              placeholder="Escolha a página em que a pergunta será disparada"
              v-model="pagina"
              type="number"
              :rules="[val => (val >= 0 && val <= livro.numero_paginas) || 'Por favor selecione uma página dentro dos limites do livro.']"
              :prefix="pagina ? 'Página' : '' "/>
            <q-input v-model="pontos" type="number" class="max-width: 25px;"
              placeholder="Escolha quantidade de pontos para o desafio"
              :suffix="pontos ? 'pontos' : ''"/>
            <q-select clearable v-model="turmaSelecionada" :options="turmas" :option-label="'nome'"
              label="Selecionar turma:"
              :prefix="turmaSelecionada ? 'Turma:' : '' "/>
              </q-form>
        </div>
        <div v-else-if="tipo === 'resenha'">
          <q-input v-model="pontos" type="number" class="max-width: 25px;"
              placeholder="Escolha quantidade de pontos para o desafio"
              :suffix="pontos ? 'pontos' : ''"/>
          <q-select clearable v-model="turmaSelecionada" :options="turmas" :option-label="'nome'"
              label="Selecionar turma:"
              :rules="[val => val != null || 'É necessário selecionar uma turma']"
              :prefix="turmaSelecionada ? 'Turma:' : '' "/>
        </div>

        <q-stepper-navigation>
          <q-btn type="submit" @click="cadastrarNovoDesafio" class="q-pd-none">
            Cadastrar
          </q-btn>
          <q-btn flat @click="step = 2" color="primary" label="Voltar" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </div>
</template>

<script>
import livroService from '../services/livroService'
import desafioService from '../services/desafioService'
import perguntaService from '../services/perguntaService'
import turmaService from '../services/turmaService'

export default {
  data () {
    return {
      tipo: null,
      tried: false,
      livro: null,
      aberta: false,
      pergunta: null,
      pagina: null,
      pontos: null,
      step: 1,
      turmas: [],
      turmaSelecionada: null,
      livros: [],
      filterLivros: []
    }
  },
  computed: {
    usuario () {
      return JSON.parse(localStorage.getItem('usuario'))
    }
  },
  mounted () {
    this.getTurmas()
    this.getLivros()
  },
  methods: {
    alterarLivro (livro) {
      this.livro = livro
      this.aberta = false
    },
    cadastrarNovoDesafio (ev) {
      ev.preventDefault()

      const desafio = {
        id_professor: 1,
        id_turma: this.turmaSelecionada.id,
        id_livro: this.livro.id_livro,
        data_inicio: new Date(),
        data_limite: new Date(),
        tipo: this.tipo,
        sincronizado: 0,
        pontos: this.pontos
      }
      desafioService.save(desafio)
        .then(result => {
          if (result > 0) {
            if (this.tipo === 'pergunta') {
              this.cadastrarPergunta()
            } else {
              this.$q.notify({
                color: 'positive',
                message: 'Desafio criado com sucesso!',
                position: 'top'
              })
              this.$router.push({ name: 'Painel' })
            }
          }
        })
    },
    cadastrarPergunta () {
      const pergunta = {
        pergunta: this.pergunta,
        pagina: this.pagina || 0
      }

      perguntaService.save(pergunta)
        .then(() => {
          this.$q.notify({
            color: 'positive',
            message: 'Desafio criado com sucesso!',
            position: 'top'
          })
          this.$router.push({ name: 'Painel' })
        })
    },
    getTurmas () {
      turmaService.get(this.usuario.id)
        .then(result => {
          this.turmas = result
        })
    },
    getLivros () {
      livroService.get()
        .then(result => {
          this.livros = result
          this.filterLivros = result
        })
    },
    filterFn (val, update) {
      update(() => {
        if (val === '') {
          this.filterLivros = this.livros
        } else {
          const needle = val.toLowerCase()
          this.filterLivros = this.livros.filter(
            v => v.titulo.toLowerCase().indexOf(needle) > -1
          )
        }
      })
    }
  }
}
</script>

<style>

</style>
