<template>
  <article class="chatroom">
    <header class="chatroom--header">
      <div class="action-bar">
        <button @click.prevent="onReturnClick">Return</button>
        <p>#{{ chatroom.id }} : {{ chatroom.name }}</p>
      </div>
      <div class="user-list">
        <p class="user-list--title">Users: </p>
        <ul class="user-list--list">
          <li class="user-list--user" v-for="user in chatroom.users" :key="user.id">
            <p class="user--name">{{ user.username }}</p>
          </li>
        </ul>
      </div>
    </header>
    <div class="chatroom--content">
      <ul class="message-list" ref="message_list">
        <li class="message" v-for="message in chatroom.messages" :key="message.id"
          :class="{ you: user.id == message.user.id }">
          <header class="message--header">
            <p class="message--sender">de: {{ message.user.username }}</p>
          </header>
          <div class="message--content">
            <!-- <p class="message--title">{{ message.title }}</p> -->
            <p class="message--text">{{ message.content }}</p>
          </div>
        </li>
      </ul>
    </div>
    <footer class="chatroom--footer">
      <form class="message-form" @submit.prevent="sendMessage">
        <input type="text" v-model="(message_value)" />
        <button type="submit">Send</button>
      </form>
    </footer>
  </article>

</template>

<script>
import socket from '@/services/socket-client.js';

export default {
  props: ["chatroom", "user"],
  data() {
    return {
      message_value: ""
    }
  },
  mounted() {
    // When a message is received
    socket.on('emit_message', (room) => {
      // load the room data
      this.chatroom = room
    })
  },
  methods: {
    onReturnClick() {
      this.$emit('returnClicked');
    },
    sendMessage() {
      let message = {
        id: null,
        user: this.user,
        content: this.message_value,
        room: this.chatroom
      }

      this.message_value = ""

      socket.emit('send_message', message);
    },
    scrollToBottom() {
      // TODO: fix this
      let container = this.$refs.message_list;
      container.scrollTop = container.scrollHeight;
    },

  }
}
</script>

<style scoped>
.chatroom {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  height: 100vh;
  gap: 1rem;
}

.chatroom--header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-list {
  display: flex;
  justify-content: space-around;
  gap: 0.5rem;
}
.user-list--title {
  font-weight: bold;
}
.user-list--list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.chatroom--content {
  flex: 1;
  overflow-y: auto;
  padding-inline: 0.2rem;
}

.message-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  list-style: none;
}

.message {
  border: 1px solid rgb(48, 48, 48);
  border-radius: 0.5rem;
  width: 90%;
}

.message.you {
  border: 1px solid hsl(231, 27%, 19%);
  border-radius: 0.5rem;
  width: 90%;
  align-self: flex-end;
}

.message.you .message--header {
  background-color: hsl(231, 38%, 56%);
}

.message--header,
.message--content {
  padding: 0.2rem 0.5rem;
}

.message--header {
  background-color: lightgrey;
  border-radius: 0.5rem 0.5rem 0 0;
}

.chatroom--footer .message-form {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.2rem;
}
.chatroom--footer input[type="text"] {
  width: 100%;
}
</style>
