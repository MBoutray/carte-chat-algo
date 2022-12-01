<template>
  <article class="chatrooms">
    <h2>Chatrooms</h2>
    <ul class="chatrooms-list--list">
      <li class="chatrooms-list--chatroom" v-for="chatroom in rooms" :key="chatroom.id" @click="onClickChatroom(chatroom)">
        <p class="chatroom--title">{{ chatroom.name }}</p>
      </li>
    </ul>
  </article>
</template>

<script>;

export default {
  props: ['rooms'],
  data() {
    return {
    };
  },
  methods: {
    onClickChatroom(room) {
      this.$emit('chatroomClicked', { id: room.id, name: room.name });
    },
  }
}
</script>

<style scoped>
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
  min-height: 3rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  cursor: pointer;
}

.chatrooms-list--chatroom:hover,
.chatrooms-list--chatroom:focus-within {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.chatrooms-list--chatroom:active {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

li+li {
  margin-top: 1rem;
}
</style>
