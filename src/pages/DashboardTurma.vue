<template>
  <q-list bordered class="rounded-borders">
    <q-expansion-item
      v-for="desafio in desafios.filter(d => d.itens.length > 0)"
      :key="desafio.id"
      expand-separator
      icon="fa fa-rocket"
      :label="`${desafio.label} (${desafio.itens.length})`"
    >
      <q-card v-for="item in desafio.itens" :key="'desafio_' + item.id" @click="goTo('Desafio', item.id_desafio)">
        <q-card-section v-if="item.pergunta">
          {{ item.pergunta }}
        </q-card-section>
        <q-card-section v-else>
          Resenha do livro: {{ item.titulo }}
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </q-list>
</template>

<script>
import desafioService from '../services/desafioService'

export default {
  data () {
    return {
      desafios: [
        {
          id: 1,
          label: 'Perguntas e Respostas',
          icon: 'fa fa-rocket',
          name: 'Ranking Alunos',
          itens: []
        },
        {
          id: 2,
          label: 'Descobrindo significado',
          icon: 'fa fa-rocket',
          name: 'Cadastro Desafio',
          itens: []
        },
        {
          id: 3,
          label: 'Escrever uma resenha',
          icon: 'fa fa-rocket',
          name: 'Turmas',
          itens: []
        },
        {
          id: 4,
          label: 'Indique o livro',
          icon: 'fa fa-rocket',
          name: 'Turmas',
          itens: []
        }
      ]
    }
  },
  computed: {
    idTurma () {
      return this.$route.params.id
    }
  },
  mounted () {
    this.getPerguntas()
    this.getResenhas()
  },
  methods: {
    getPerguntas () {
      desafioService.getPerguntasTurma(this.idTurma)
        .then(result => {
          this.desafios[0].itens = result
        })
    },
    getResenhas () {
      desafioService.getResenhas(this.idTurma)
        .then(result => {
          this.desafios[2].itens = result
        })
    },
    goTo (routeName, idDesafio) {
      this.$router.push({ name: routeName, params: { id: idDesafio, idTurma: this.idTurma } })
    }
  }
}
</script>

<style>

</style>
