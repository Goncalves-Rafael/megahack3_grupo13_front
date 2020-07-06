<template>
  <div>
    <q-select
      v-model="turmaSelecionada"
      :options="turmas"
      :option-label="'nome'"
      label="Turma Selecionada" />
    <q-list>
      <q-item clickable v-ripple v-for="(aluno, index) in turmaSelecionada.alunos" :key="'aluno_' + aluno.id">
        <q-icon :color="index == 0 ? 'yellow-7' : index === 1 ? 'blue-grey-6' : index === 2 ? 'orange-13' : ''"
          class="q-mr-md" name="fa fa-trophy" size="2rem" />

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
          for (let i = 0; i < result.length; i++) {
            const aluno = result[i]
            this.turmas.find(t => t.id === aluno.id_turma).alunos.push(aluno)
          }
          for (let i = 0; i < this.turmas.length; i++) {
            this.turmas[i].alunos.sort((a, b) => (b.pontuacao + b.nota) - (a.pontuacao + a.nota))
          }
          this.turmaSelecionada = this.turmas[0]
        })
    }
  }
}
</script>

<style>

</style>
