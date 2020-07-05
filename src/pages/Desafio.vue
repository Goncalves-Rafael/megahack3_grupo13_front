<template>
  <div>
    <q-list>
      <q-item v-for="aluno in alunos" :key="aluno.id" :clickable="aluno.resposta != null" @click="avaliar(aluno)">
        <q-item-section avatar>
            <q-avatar text-color="black" icon="person" />
          </q-item-section>
        <q-item-section>
          <q-item-label>{{ aluno.nome }}</q-item-label>
          <q-item-label caption lines="2">Adicionar última atividade.</q-item-label>
        </q-item-section>

        <q-item-section side>
            <q-badge
              :label="aluno.nota === null ? aluno.resposta === null ? 'Não respondeu' : 'Pendente' : aluno.nota" />
          </q-item-section>
      </q-item>
    </q-list>

    <q-dialog v-if="respostaSelecionada" v-model="showAvaliar" transition-show="scale">
     <q-card>
      <q-item v-ripple>
        <q-item-section side>
          <q-avatar rounded size="48px">
            <img src="https://lh3.googleusercontent.com/MKFOXKJRiXkd1VfeU8qX38zjMnMmut3UppdYTXcOHKRkVvmfk-ECy7pd3de6kTz5Sq4" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>Oi Professor</q-item-label>
          <q-item-label caption>O {{ respostaSelecionada.nome }} respondeu ao desafio:</q-item-label>
        </q-item-section>
        <q-item-section side>
          Valor total <br>{{ desafio.pontos }} pontos
        </q-item-section>
      </q-item>
      <q-card-section>
        <div class="text-h6">
          {{ desafio.pergunta }}
        </div>
        <q-input
          v-if="respostaSelecionada.titulo"
          v-model="respostaSelecionada.titulo"
          filled
          label="Titulo"
          disable
        />
        <q-input
          v-model="respostaSelecionada.resposta"
          filled
          disable
          type="textarea"
          label="Resposta do aluno:"
          stack-label
        />
        <q-form @submit="salvarNota">
          <q-input
            type="number"
            label="Nota para o aluno:"
            v-model="nota"
            :rules="[val => (val >= 0 && val <= desafio.pontos) || 'A nota deve estar dentro do limite.']" />
          <q-btn color="secondary" type="submit">
            Salvar
          </q-btn>
        </q-form>
      </q-card-section>
     </q-card>
    </q-dialog>
  </div>
</template>

<script>
import desafioService from '../services/desafioService'

export default {
  data () {
    return {
      alunos: [],
      desafio: null,
      respostaSelecionada: null,
      showAvaliar: false,
      nota: null
    }
  },
  computed: {
    idDesafio () {
      return this.$route.params.id
    },
    idTurma () {
      return this.$route.params.idTurma
    }
  },
  mounted () {
    this.getDesafio()
  },
  methods: {
    getDesafio () {
      desafioService.getById(this.idDesafio)
        .then(result => {
          this.desafio = result[0]
          if (this.desafio.tipo === 'pergunta') {
            this.getPergunta()
          }
          this.getAlunosComRespostas(this.desafio.id)
        })
    },
    getPergunta () {
      desafioService.getPergunta(this.idDesafio)
        .then(result => {
          this.desafio = result[0]
        })
    },
    getAlunosComRespostas (idDesafio) {
      desafioService.getAlunosComRespostas(idDesafio, this.idTurma)
        .then(result => {
          this.alunos = result
        })
    },
    avaliar (aluno) {
      this.respostaSelecionada = aluno
      this.showAvaliar = true
    },
    salvarNota (ev) {
      ev.preventDefault()
      desafioService.salvarNota(
        this.idDesafio,
        this.respostaSelecionada.id_aluno,
        this.nota
      ).then(result => {
        this.$q.notify({
          position: 'top',
          message: 'Nota atualizada com sucesso!',
          color: 'positive'
        })
        this.getDesafio()
        this.respostaSelecionada = null
        this.showAvaliar = false
      })
    }
  }
}
</script>

<style>

</style>
