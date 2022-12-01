<template>
  <div id="content">
    <LoginScreen @userLoggedIn="onLogin" v-if="!user" />
    <RestaurantList />
    <Map />
    <Chat :user="this.user" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null
    }
  },
  methods: {
    onLogin(user) {
      this.user = user;
    },
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
