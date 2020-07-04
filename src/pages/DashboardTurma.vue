<template>
  <q-list bordered class="rounded-borders">
    <q-expansion-item
      v-for="desafio in desafios"
      :key="desafio.id"
      expand-separator
      icon="fa fa-rocket"
      :label="`${desafio.label} (${desafio.itens.length})`"
    >
      <q-card v-for="item in desafio.itens" :key="'desafio_' + item.id">
        <q-card-section>
          {{ item.pergunta + item.data_limite }}
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
  },
  methods: {
    getPerguntas () {
      desafioService.getPerguntasTurma(this.idTurma)
        .then(result => {
          debugger
          this.desafios[0].itens = result
        })
    },
    goTo (routeName) {
      this.$router.push({ name: routeName })
    }
  }
}
</script>

<style>

</style>
