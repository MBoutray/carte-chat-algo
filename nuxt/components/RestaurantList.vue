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

<style scoped>
.restaurant-list {
  padding: 1rem;
}

.restaurant-list--list {
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;
  margin-top: 1.5rem;
}

.restaurant-list--restaurant {
  padding: 0.5rem;
  border: 1px solid black;
  border-radius: 1rem;
  transition: box-shadow 0.1s ease-in-out;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  cursor: pointer;
}

.restaurant-list--restaurant:hover,
.restaurant-list--restaurant:focus-within {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.restaurant-list--restaurant:active {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

li+li {
  margin-top: 1rem;
}
</style>
