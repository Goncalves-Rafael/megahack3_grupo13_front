<template>
  <q-list>
    <q-item v-for="item in dashboardItens" :key="item.id"
      clickable
      @click.stop="goTo(item.name)"
    >
      <q-item-section avatar>
        <q-icon color="primary" :name="item.icon" />
      </q-item-section>

      <q-item-section>{{ item.label }}</q-item-section>
    </q-item>
  </q-list>
</template>

<script>
export default {
  data () {
    return {
      dashboardItens: [
        {
          id: 1,
          label: 'Ranking dos alunos',
          icon: 'fa fa-users',
          name: 'Ranking Alunos'
        },
        {
          id: 2,
          label: 'Criar desafio',
          icon: 'fa fa-rocket',
          name: 'Cadastro Desafio'
        },
        {
          id: 3,
          label: 'Turmas',
          icon: 'fa fa-users',
          name: 'Turmas'
        }
      ]
    }
  },
  methods: {
    goTo (routeName) {
      this.$router.push({ name: routeName })
    }
  }
}
</script>

<style>

</style>
