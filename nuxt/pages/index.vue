<template>
  <div id="content">
    <LoginScreen @userLoggedIn="onLogin" v-if="!user" />
    <RestaurantList :restaurants="restaurants" @restoSelected="onRestoSelected" />
    <Map :restaurants="restaurants" :v-if="restoToMap" :restoToMap="restoToMap" :user="user" />
    <Chat :user="user" :rooms="rooms" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null,
      restaurants: [
        { name: 'kfc', loc: [48.89062, 2.23673], id: 1 },
        { name: 'resto 1', loc: [48.89546, 2.2278], id: 2 },
        { name: 'pizza', loc: [48.89493, 2.22299], id: 3 },
        { name: 'bar', loc: [48.89266, 2.22432], id: 4 }
      ],
      rooms: null,
      restoToMap: null
    }
  },
  methods: {
    onLogin(payload) {
      this.user = payload.user
      this.rooms = payload.rooms
    },
    onRestoSelected(event) {
      this.restoToMap = event
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

