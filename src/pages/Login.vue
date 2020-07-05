<template>
  <q-layout ref="layout" view="lHh Lpr fff" :left-class="{'bg-grey-2': true}">
    <q-layout class="layout-page-login q-pa-lg" row wrap>

      <div class="area-login fixed-center">
        <div id="box-login" >
          <div class="q-pa-md row"><q-icon size="8rem" name="img:icons/macaquinho.png"/></div>
          <div id="formulario">
            <!-- User -->
            <q-input xs12 label="E-mail"
                v-model="credentials.email"
                :stack-label="true">
            </q-input>
            <!-- senha -->
            <q-input xs12 label="Senha"
              v-model="credentials.senha"
              type="password"
              :stack-label="true">
            </q-input>
            <!-- Loading Buttom -->
            <div class="q-py-lg" xs12>
              <q-btn :loading="loading"
                      warning dark
                      id="loginButton"
                      @click.native="login"
                      class="text-black full-width">Entrar
              </q-btn>
              <div v-if="false" class="q-py-md">
                <q-slide-item dense @left="onLeft">
                  <template v-slot:left>
                    <q-icon name="lock_open" />
                    {{device.serial}}
                  </template>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="keyboard_arrow_right" />
                    </q-item-section>
                    <q-item-section></q-item-section>
                  </q-item>
                </q-slide-item>
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-layout>
  </q-layout>
</template>

<script>
import loginService from '../services/loginService'

export default {
  name: 'Login',
  data () {
    return {
      credentials: {
        email: '',
        senha: ''
      },
      loading: false
    }
  },
  methods: {
    login () {
      this.loading = true
      loginService.login(this.credentials)
        .then(usuario => {
          const isProfessor = usuario.papel === 'professor'
          localStorage.setItem('usuario', JSON.stringify(usuario))
          localStorage.setItem('jwt', usuario.token)

          if (localStorage.getItem('jwt') != null) {
            this.$emit('loggedIn')
            if (this.$route.params.nextUrl != null) {
              this.$router.push(this.$route.params.nextUrl)
            } else {
              if (isProfessor === 1) {
                this.$router.push('professor')
              } else {
                this.$router.push('/')
              }
            }
          }
        })
        .catch(err => {
          this.$q.notify({
            message: err.message,
            color: 'negative'
          })
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style>

</style>
