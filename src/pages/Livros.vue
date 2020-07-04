<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md">
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          align="justify"
          class="text-teal shadow-2"
          :breakpoint="0"
        >
          <q-tab name="livros" icon="get_app" label="Livros" />
          <q-tab name="baixados" icon="settings_cell" label="Baixados" />
        </q-tabs>

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="livros">
            Sem conexão no momento
          </q-tab-panel>

          <q-tab-panel name="baixados" class="row livro--card">
            <q-card v-for="livro in baixados" :key="livro.id" class="col-4" @click="iniciarLeitura(livro)">
              <img :src="livro.capa">

              <q-card-section>
                <div class="text-h6">{{ livro.titulo }}</div>
                <div class="text-subtitle2">{{ livro.autor }}</div>
              </q-card-section>

              <q-card-actions align="center">
                <q-btn icon="local_library" flat>Ler</q-btn>
                <q-btn icon="close" flat>Deletar</q-btn>
              </q-card-actions>
            </q-card>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>

<script>
import livroService from '../services/livroService'

export default {
  data () {
    return {
      tab: 'baixados',
      livros: [],
      baixados: []
    }
  },
  mounted () {
    this.carregarLivrosLocais()
  },
  methods: {
    carregarLivrosLocais () {
      livroService.get()
        .then(result => {
          this.baixados = result
        })
    },
    iniciarLeitura (livro) {
      this.$router.push({ path: `/leitura/${livro.id}` })
    }
  }
}
</script>

<style scoped>
.livro--card:hover {
  cursor: pointer;
}
</style>
