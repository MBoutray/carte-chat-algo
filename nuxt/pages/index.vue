<template>
  <div id="content">
    <LoginScreen @login="onLogin" v-if="username == ''" />
    <RestaurantList />
    <Map />
    <Chat />
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: ''
    }
  },
  methods: {
    onLogin(username) {
      this.username = username;
    }
  }
}
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
</style>

<style scoped>
#content {
  position: relative;
  display: grid;
  grid-template-columns: 2fr 7fr 3fr;
}
</style>
