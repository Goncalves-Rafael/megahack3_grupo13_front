<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://lh3.googleusercontent.com/MKFOXKJRiXkd1VfeU8qX38zjMnMmut3UppdYTXcOHKRkVvmfk-ECy7pd3de6kTz5Sq4">
          </q-avatar>
          MATO
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer bordered class="bg-white text-grey">
      <q-toolbar>
        <div class="fit row wrap justify-around items-start content-start">
          <q-btn color="grey" flat v-for="item in menuItens" v-bind:key="item.id" clickable :to="item.ref" :icon="item.icon" />
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
      menuItens: [
        { disable: false, id: 'home', ref: '/', label: '', icon: 'home' },
        { disable: false, id: 'alunos', ref: '/alunos', label: 'Alunos', icon: 'fa fa-users' },
        { disable: false, id: 'livros', ref: '/livros', label: 'Livros', icon: 'fa fa-book' },
        { disable: true, id: 'desafios', ref: '/desafios/cadastrar', label: 'Desafios', icon: 'fa fa-rocket' },
        { disable: false, id: 3, ref: '/sair', label: 'Sair', icon: 'exit_to_app' }
      ]
    }
  }
}
</script>
