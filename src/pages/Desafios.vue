<template>
  <q-list class="full-width row wrap content-end q-gutter-md justify-center">
    <q-card v-for="desafio in desafios" :key="desafio.id" class="col-3" style="max-width: 30vw;">
      <q-card-section class="bg-teal text-white">
        <div class="text-h6" style="text-transform: capitalize;">{{ desafio.tipo }}</div>
      </q-card-section>
      <q-card-section>
        <p>{{ desafio.pergunta }}</p>
        <p>Livro: {{ desafio.titulo }}</p>
        <p>Turma: {{ desafio.id_turma }}</p>
        <p>Termina em: {{ desafio.data_limite }}</p>
      </q-card-section>
    </q-card>
  </q-list>
</template>

<script>
import desafioService from '../services/desafioService'

export default {
  name: 'desafios',
  data () {
    return {
      desafios: []
    }
  },
  mounted () {
    this.carregarDesafios()
  },
  methods: {
    carregarDesafios () {
      desafioService.get()
        .then(result => {
          this.desafios = result
        })
    }
  }
}
</script>

<style>

</style>
