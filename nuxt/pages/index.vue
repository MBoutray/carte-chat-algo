<template>
    <div id="content">
        <LoginScreen @userLoggedIn="onLogin" v-if="!user" />
        <RestaurantList :restaurants="restaurants" @restoSelected="onRestoSelected" />
        <Map :restaurants="restaurants" :v-if="restoToMap" :restoToMap="restoToMap" />
        <Chat :user="this.user" />
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
                { name: 'bar', loc: [48.89266, 2.22432], id: 4 },
                { name: 'balizy', loc: [48.6851, 2.3176], id: 5}
            ],
            restoToMap: null
        }
    },
    methods: {
        onLogin(user) {
            this.user = user
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
    grid-template-columns: 2fr 7fr 2fr;
}
</style>

