<template>
  <div>
    <q-select
      v-model="turmaSelecionada"
      :options="turmas"
      :option-label="'nome'"
      label="Turma Selecionada" />
    <q-list>
      <q-item clickable v-ripple v-for="aluno in turmaSelecionada.alunos" :key="'aluno_' + aluno.id">
        <q-avatar color="primary" text-color="white">
          {{ aluno.nome[0].toUpperCase() }}
        </q-avatar>

        <q-item-section class="q-pl-sm">{{ aluno.nome }}</q-item-section>
        <q-item-section side>{{ aluno.pontuacao + aluno.nota }}</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import turmaService from '../services/turmaService'

export default {
  data () {
    return {
      turmas: [],
      turmaSelecionada: {
        alunos: []
      }
    }
  },
  computed: {
    usuario () {
      return JSON.parse(localStorage.getItem('usuario'))
    }
  },
  mounted () {
    this.getTurmas()
  },
  methods: {
    getTurmas () {
      turmaService.get(this.usuario.id)
        .then(result => {
          this.turmas = result.map(t => {
            return {
              ...t,
              alunos: []
            }
          })
          this.getAlunos()
        })
    },
    getAlunos () {
      turmaService.getAlunosComNotas()
        .then(result => {
          result.forEach(a => {
            this.turmas.find(t => t.id === a.id_turma).alunos.push(a)
          })
          this.turmaSelecionada = this.turmas[0]
        })
    }
  }
}
</script>

<style>

</style>
