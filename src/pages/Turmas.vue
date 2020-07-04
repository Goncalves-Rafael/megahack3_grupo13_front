<template>
  <q-list bordered class="rounded-borders">
    <q-expansion-item
      v-for="serie in series"
      :key="serie.id"
      expand-separator
      icon="perm_identity"
      :label="serie.nivel + serie.id + 'º'"
    >
      <q-card v-for="turma in serie.turmas" :key="'turma_' + turma.id" @click="goTo('Turma', turma.id)">
        <q-card-section>
          {{ turma.nome }}
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </q-list>
</template>

<script>
import turmaService from '../services/turmaService'

export default {
  data () {
    return {
      series: []
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
          result.forEach(function (t) {
            let serie = this.series.find(s => s.id === t.serie)
            if (!serie) {
              serie = {
                id: t.serie,
                nivel: t.nivel,
                turmas: [t]
              }
              this.series.push(serie)
            } else {
              serie.turmas.push(t)
            }
          }.bind(this))
        })
    },
    goTo (routeName, idTurma) {
      this.$router.push({ name: routeName, params: { id: idTurma } })
    }
  }
}
</script>

<style>

</style>
