<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://lh3.googleusercontent.com/MKFOXKJRiXkd1VfeU8qX38zjMnMmut3UppdYTXcOHKRkVvmfk-ECy7pd3de6kTz5Sq4">
          </q-avatar>
          {{ this.$router.currentRoute.name }}
        </q-toolbar-title>
        <q-btn icon="fa fa-reply" flat @click="voltar" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer bordered class="bg-white text-grey" v-if="$router.currentRoute.name != 'Leitura'">
      <q-toolbar>
        <div class="fit row wrap justify-around items-start content-start">
          <q-btn color="grey" flat v-for="item in menuItensFiltered" v-bind:key="item.id" clickable :to="item.ref" :icon="item.icon" />
        </div>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',

  data () {
    return {
      leftDrawerOpen: false,
      menuItensProfessor: [
        { id: 'home', ref: '/', label: '', icon: 'home' },
        { id: 'turmas', ref: '/turmas', label: 'Turmas', icon: 'fa fa-users' },
        { id: 'livros', ref: '/livros', label: 'Livros', icon: 'fa fa-book' },
        { id: 'desafios', ref: '/desafios/cadastrar', label: 'Desafios', icon: 'fa fa-rocket' },
        { id: 3, ref: '/sair', label: 'Sair', icon: 'exit_to_app' }
      ],
      menuItensAluno: [
        { id: 'home', ref: '/', label: '', icon: 'home' },
        { id: 'aluno', ref: '/aluno', label: 'Aluno', icon: 'fa fa-user' },
        { id: 'livros', ref: '/livros', label: 'Livros', icon: 'fa fa-book' },
        { id: 3, ref: '/sair', label: 'Sair', icon: 'exit_to_app' }
      ]
    }
  },
  computed: {
    usuario () {
      return JSON.parse(localStorage.getItem('usuario'))
    },
    menuItensFiltered () {
      return this.usuario.papel === 'professor' ? this.menuItensProfessor : this.menuItensAluno
    }
  },
  methods: {
    voltar () {
      this.$router.back()
    }
  }
}
</script>
