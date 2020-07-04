<template>
  <q-dialog class="full-width container" v-model="aberta">
    <div class="text-h4">Selecione um livro:</div>
    <div class="full-width row wrap justify-center items-center content-end">
      <q-card v-for="livro in livros" :key="livro.id" class="col-4 livro-card" @click="$emit('livroSelecionado', livro)">
        <img :src="livro.capa">

        <q-card-section>
          <div class="text-h6">{{ livro.titulo }}</div>
          <div class="text-subtitle2">{{ livro.autor }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Lorem ipsum
        </q-card-section>
      </q-card>
      <q-card v-for="livro in livros" :key="livro.id" class="col-4 livro-card">
        <img :src="livro.capa">

        <q-card-section>
          <div class="text-h6">{{ livro.titulo }}</div>
          <div class="text-subtitle2">{{ livro.autor }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Lorem ipsum
        </q-card-section>
      </q-card>
    </div>
  </q-dialog>
</template>

<script>
import livroService from '../services/livroService'
export default {
  name: 'livro-picker',
  props: {
    aberta: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      livros: [],
      tried: false
    }
  },
  mounted () {
    this.getLivros()
  },
  methods: {
    getLivros () {
      livroService.get()
        .then(result => {
          this.livros = result
        })
    }
  }
}
</script>

<style scoped>
* {
  background-color: white;
}
</style>
