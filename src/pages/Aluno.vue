<template>
  <div>
    <q-item clickable v-ripple v-if="aluno != null">
      <q-avatar color="primary" text-color="white">
        {{ aluno.nome_aluno[0].toUpperCase() }}
      </q-avatar>

      <q-item-section class="q-pl-sm text-h4">{{ aluno.nome_aluno }}</q-item-section>
      <q-item-section side>Turma: {{ aluno.nome_turma }}</q-item-section>
    </q-item>
    <q-list>
      <q-item v-for="resposta in respostas" :key="resposta.id">
        <q-item-section>{{ resposta.tipo == 'pergunta' ? 'Perguntas e Respostas' : 'Resenha'}}</q-item-section>
        <q-item-section side>{{ resposta.nota || 'Pendente' }}</q-item-section>
      </q-item>
    </q-list>
    <q-item>
      <q-item-section color="secondary">Total</q-item-section>
      <q-item-section side>{{ respostas.reduce((acc, el) => acc + el.nota, 0)}}</q-item-section>
    </q-item>
  </div>
</template>

<script>
import alunoService from '../services/alunoService'

export default {
  data () {
    return {
      aluno: null,
      respostas: []
    }
  },
  computed: {
    usuario () {
      return JSON.parse(localStorage.getItem('usuario'))
    },
    idAluno () {
      return this.$route.params.id || this.usuario.id
    }
  },
  mounted () {
    this.getInfoAluno()
    this.getRespostas()
  },
  methods: {
    getInfoAluno () {
      alunoService.getAlunoById(this.idAluno)
        .then(result => {
          this.aluno = result[0]
        })
    },
    getRespostas () {
      alunoService.getAlunoRespostas(this.idAluno)
        .then(result => {
          this.respostas = result
        })
    }
  }
}
</script>

<style>

</style>
