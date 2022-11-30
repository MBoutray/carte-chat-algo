<template>
  <article class="chatrooms">
    <h2>Chatrooms</h2>
    <ul class="chatrooms-list--list">
      <li class="chatrooms-list--chatroom" v-for="chatroom in rooms">
        <p class="chatroom--title">{{ chatroom.name }}</p>
      </li>
    </ul>
  </article>
</template>

<script>
export default {
  data() {
    return {
      rooms: [
        {
          id: 1,
          name: "room 1",
        },
        {
          id: 2,
          name: "room 2",
        },
        {
          id: 3,
          name: "room 3",
        },
        {
          id: 4,
          name: "room 4",
        },
      ]
    };
  },
}
</script>

<style>
h2 {
  text-align: center;
}

.chatrooms {
  padding: 1rem;
}

.chatrooms-list--list {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  list-style: none;
  margin-top: 1.5rem;
}

.chatrooms-list--chatroom {
  padding: 0.5rem;
  border: 1px solid black;
  border-radius: 1rem;
  transition: box-shadow 0.1s ease-in-out;
  width: 100%;
}

.chatrooms-list--chatroom:hover,
.chatrooms-list--chatroom:focus-within {
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
}
</style>
