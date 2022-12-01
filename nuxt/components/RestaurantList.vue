<template>
  <article class="restaurant-list">
    <h2>Liste des restaurants</h2>
    <ul class="restaurant-list--list">
      <li class="restaurant-list--restaurant" v-for="(restaurant, index) in restaurants" :key="index" @click="selectResto(restaurant)">
        <p class="restaurant--title">{{ restaurant.name }}</p>
        <p class="restaurant--coordinates">lat: {{ restaurant.loc[0] }}, long: {{ restaurant.loc[1] }}</p>
      </li>
    </ul>
  </article>
</template>

<script>
export default {
  props: {
    restaurants: [],
  },
  methods: {
    selectResto(restaurant) {
      this.$emit('restoSelected', restaurant);
    }
  }
}
</script>

<style>
.restaurant-list {
  padding: 1rem;
}

.restaurant-list--list {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  list-style: none;
  margin-top: 1.5rem;
}

.restaurant-list--restaurant {
  padding: 0.5rem;
  border: 1px solid black;
  border-radius: 1rem;
  transition: box-shadow 0.1s ease-in-out;
}

.restaurant-list--restaurant:hover,
.restaurant-list--restaurant:focus-within {
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
}

li+li {
  margin-top: 1rem;
}
</style>
