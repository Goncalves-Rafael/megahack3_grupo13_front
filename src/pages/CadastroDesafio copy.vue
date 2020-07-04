<template>
  <div class="q-pa-md">
    <div class="text-h5">Cadastro de desafio</div>
    <div class="q-gutter-y-md">
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          align="justify"
          class="text-teal shadow-2"
          :breakpoint="0"
        >
          <q-tab name="pergunta" icon="help_center" label="Pergunta" />
          <q-tab name="indicacao" icon="class" label="Indicação" />
        </q-tabs>

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="pergunta">
            <q-card>
              <q-card-section horizontal>
                <q-card-section>
                  <div class="text-h6">Pergunta</div>
                  Crie uma questão desafio para o aluno responder durante a leitura.
                  <q-form @submit="cadastrarNovoDesafio">
                    <q-input v-model="pergunta" placeholder="Escreva aqui a pergunta"/>
                    <q-input
                      placeholder="Escolha a página em que a pergunta será disparada"
                      v-model="pagina"
                      type="number"
                      :prefix="pagina ? 'Página' : '' "/>
                    <q-input v-model="pontos" type="number" class="max-width: 25px;"
                      placeholder="Escolha quantidade de pontos para o desafio"
                      :suffix="pontos ? 'pontos' : ''"/>
                    <q-btn @click.prevent="aberta = true" class="q-pd-none">
                      Escolher livro
                    </q-btn>
                    <q-btn type="submit" class="q-pd-none">
                      Cadastrar
                    </q-btn>
                  </q-form>
                </q-card-section>
                <q-card v-if="livro != null" class="livro-card q-ml-xl">
                  <img :src="livro.capa">

                  <q-card-section>
                    <div class="text-h6">{{ livro.titulo }}</div>
                    <div class="text-subtitle2">{{ livro.autor }}</div>
                  </q-card-section>

                  <q-card-section class="q-pt-none">
                    Lorem né
                  </q-card-section>
                </q-card>
                <livro-picker :aberta="aberta" @livroSelecionado="alterarLivro" />
              </q-card-section>
            </q-card>
          </q-tab-panel>

          <q-tab-panel name="indicacao">
            <div class="text-h6">Indicação</div>
            Crie um desafio de indicações, se os alunos lerem livros indicados entre eles ambos ganham pontos!
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>

<script>
import desafioService from '../services/desafioService'
import perguntaService from '../services/perguntaService'
import LivroPicker from '../components/LivroPicker'

export default {
  data () {
    return {
      tab: 'pergunta',
      tried: false,
      livro: null,
      aberta: false,
      pergunta: null,
      pagina: null,
      pontos: null
    }
  },
  components: {
    LivroPicker
  },
  mounted () {
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
        id_turma: 1,
        data_inicio: new Date(),
        data_limite: new Date(),
        tipo: this.tab,
        sincronizado: false,
        pontos: this.pontos
      }
      desafioService.save(desafio)
        .then(result => {
          if (result > 0) {
            if (this.tab === 'pergunta') {
              this.cadastrarPergunta()
            }
          }
        })
    },
    cadastrarPergunta () {
      const pergunta = {
        id_livro: this.livro.id,
        pergunta: this.pergunta,
        pagina: this.pagina || 0
      }

      perguntaService.save(pergunta)
        .then(() => {
          this.$q.notify('seila')
        })
    }
  }
}
</script>

<style>

</style>
