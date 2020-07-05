<template>
  <div>
    <q-dialog v-model="show" >
      <q-card class="bg-grey-4">
        <q-item v-ripple>
          <q-item-section side>
            <q-avatar rounded size="48px">
              <img src="https://lh3.googleusercontent.com/MKFOXKJRiXkd1VfeU8qX38zjMnMmut3UppdYTXcOHKRkVvmfk-ECy7pd3de6kTz5Sq4" />
              <q-badge floating color="red">Conversa</q-badge>
            </q-avatar>
          </q-item-section>
        </q-item>
        <div class="q-pa-md row justify-center">
          <div style="width: 100%; max-width: 400px">
            <q-chat-message
              v-for="(message, index) in messages"
              :key="'message_' + index"
              :text="[message.text]"
              :sent="message.sent"
            />
            <q-spinner-dots size="2rem" v-if="respondendo" />
          </div>
        </div>
        <q-input
          v-model="message"
          class="q-pa-md"
          :disable="respondendo"
          bg-color="white"
          @keypress="enviar"
        >
          <template v-slot:append>
            <q-btn flat :ripple="false" style="z-index: 9999;" icon="send" color="primary" @click="enviar"/>
          </template>
        </q-input>
     </q-card>
    </q-dialog>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="fa fa-question" color="primary" @click="show = true" />
    </q-page-sticky>
  </div>
</template>

<script>
import dicionarioService from '../services/dicionarioService'

export default {
  data () {
    return {
      show: false,
      messages: [
        {
          text: 'Se você não souber o significado de uma palavra é só me mandar aqui que eu tento te ajudar.',
          sent: false
        }
      ],
      message: '',
      respondendo: false
    }
  },
  methods: {
    enviar (ev) {
      if ((ev.type !== 'click' && ev.key !== 'Enter') || this.message == null || this.message.length === 0) return
      this.respondendo = true
      this.messages.push({
        text: this.message,
        sent: true
      })
      const messageTemp = this.message
      dicionarioService.findWord(messageTemp)
        .then(result => {
          if (result.data.length === 0) {
            this.sugerirAlternativas(messageTemp)
          } else {
            let resposta = `Significado de ${messageTemp}: `
            resposta += result.data[0].xml.split('def')[1].split('\n')[1]
            this.messages.push({
              text: resposta,
              sent: false
            })
            this.respondendo = false
          }
        })
      this.message = ''
    },
    sugerirAlternativas (palavra) {
      dicionarioService.findNear(palavra)
        .then(result => {
          let resposta = `Eu não conheço a palavra ${palavra}.`
          resposta += `Não seria uma dessas? ${result.data.join(', ')}`
          this.messages.push({
            text: resposta,
            sent: false
          })
          this.respondendo = false
        })
    }
  }
}
</script>

<style>

</style>
