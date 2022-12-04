<template>
  <article class="login-screen">
    <form class="login-screen--form" @submit.prevent="onSubmit">
      <h1 class="login-screen--title">Se connecter</h1>
      <label class="login-screen--label" for="username">Nom d'utilisateur</label>
      <input class="login-screen--input" type="text" v-model="username" />

      <button class="login-screen--submit" type="submit">Login</button>
    </form>
  </article>
</template>

<script>
import socket from '@/services/socket-client.js';

export default {
  data() {
    return {
      username: ""
    };
  },
  mounted() {
    // if (!socket.connected) socket.connect()

  },
  methods: {
    onSubmit() {
      socket.emit('login', this.username, (response) => {
        if (response.status === 'ok') {
          // Send the user to the app component
          this.$emit('userLoggedIn', response.content)
        } else {
          alert(response.content)
        }
      });
    },
  },
};
</script>

<style scoped>
.login-screen {
  position: absolute;
  inset: 0;
  z-index: 1001;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-screen--form {
  background-color: rgb(204, 204, 204);
  padding: 1.5rem;
  border-radius: 1rem;
}

.login-screen--title {
  margin-bottom: 1rem;
  text-align: center;
}
</style>
