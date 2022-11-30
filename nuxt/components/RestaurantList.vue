<template>
  <article class="restaurant-list">
    <h2>Liste des restaurants</h2>
    <ul class="restaurant-list--list">
      <li class="restaurant-list--restaurant" v-for="restaurant in restaurants">
        <p class="restaurant--title">{{ restaurant.name }}</p>
        <p class="restaurant--coordinates">lat: {{ restaurant.loc[0] }}, long: {{ restaurant.loc[1] }}</p>
      </li>
    </ul>
  </article>
</template>

<script>
export default {
  data() {
    return {
      restaurants: [
        {
          name: "KFC",
          loc: [48.89062, 2.23673]
        },
        {
          name: "restaurant 2",
          loc: [48.88062, 2.22673]
        }
      ]
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
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

.restaurant-list--restaurant:hover,
.restaurant-list--restaurant:focus-within {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

li+li {
  margin-top: 1rem;
}
</style>
