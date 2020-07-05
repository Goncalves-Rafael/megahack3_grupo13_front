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
                <q-btn icon="create" color="secondary" text-color="white" v-if="livro.tipo == 'resenha' && livro.resenha == null" @click.stop="redigirResenha(livro)"/>
                <q-btn icon="close" color="red" text-color="white" @click.stop="deletarLivro(livro)"/>
              </q-card-actions>
            </q-card>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
    <q-dialog v-if="livroSelecionado" v-model="showResenha" transition-show="scale">
     <q-card>
      <q-item v-ripple>
        <q-item-section side>
          <q-avatar rounded size="48px">
            <img src="https://lh3.googleusercontent.com/MKFOXKJRiXkd1VfeU8qX38zjMnMmut3UppdYTXcOHKRkVvmfk-ECy7pd3de6kTz5Sq4" />
            <q-badge floating color="red">Resenha</q-badge>
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>Rafael</q-item-label>
          <q-item-label caption>Escreva uma resenha sobre o livro e ganha pontos</q-item-label>
        </q-item-section>
        <q-item-section side>
          {{ livroSelecionado.pontos }} pontos
        </q-item-section>
      </q-item>
      <q-card-section>
        <q-input
          v-model="resenha.titulo"
          filled
          label="Titulo opcional"
        />
        <q-input
          v-model="resenha.corpo"
          filled
          type="textarea"
          label="Redija aqui sua resenha"
        />
      </q-card-section>
      <q-card-actions class="q-px-md">
        <q-btn color="secondary" @click="salvarResenha" :disable="resenha.corpo == null || resenha.corpo.length < 50">
          Salvar
        </q-btn>
        <q-btn color="grey" @click="showResenha = false">
          Depois
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
  data () {
    return {
      tab: 'baixados',
      livros: [],
      baixados: [],
      resenhas: [],
      showResenha: false,
      livroSelecionado: null,
      resenha: {
        titulo: null,
        corpo: null
      }
    }
  },
  computed: {
    usuario () {
      return JSON.parse(localStorage.getItem('usuario'))
    }
  },
  mounted () {
    this.carregarLivrosLocais()
  },
  methods: {
    carregarLivrosLocais () {
      livroService.get(this.usuario.id_turma)
        .then(result => {
          this.baixados = result
          this.getResenhas()
        })
    },
    iniciarLeitura (livro) {
      this.$router.push({ name: 'Leitura', params: { id: livro.id_livro } })
    },
    getResenhas () {
      desafioService.getResenhasPorAluno(this.usuario.id)
        .then(result => {
          this.resenhas = result
          for (let i = 0; i < this.resenhas.length; i++) {
            const livro = this.baixados.find(l => l.id_livro === this.resenhas[i].id_livro)
            if (livro) {
              livro.resenha = this.resenhas[i]
            }
          }
          this.$forceUpdate()
        })
    },
    redigirResenha (livro) {
      this.livroSelecionado = livro
      this.showResenha = true
    },
    salvarResenha () {
      const resenha = {
        id_aluno: this.usuario.id,
        id_desafio: this.livroSelecionado.id_desafio,
        titulo: this.resenha.titulo,
        resposta: this.resenha.corpo
      }
      desafioService.salvarResposta(resenha)
        .then(result => {
          this.livroSelecionado = null
          this.showResenha = false
          this.getResenhas()
        })
        .catch(err => {
          console.log(err)
        })
    },
    deletarLivro (livro) {
      this.$q.dialog({
        title: 'Confirmação',
        message: 'Deseja remover o livro dos arquivos locais?',
        cancel: 'Cancelar',
        ok: 'Confirmar'
      }).onOk(() => {
        livroService.delete(livro.id_livro)
          .then(result => {
            this.carregarLivrosLocais()
          })
          .catch(err => {
            console.log(err)
          })
      })
    }
  }
}
</script>

<style scoped>
.livro--card:hover {
  cursor: pointer;
}
</style>
