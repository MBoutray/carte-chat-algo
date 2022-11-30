<template>
  <article class="chatroom">
    <header class="chatroom--header">
      <button @click.prevent="onReturnClick">Return</button>
      <p>#{{ chatroom?.id ?? "num" }} : {{ chatroom.name ?? "name" }}</p>
    </header>
    <div class="chatroom--content">
      <ul class="message-list" ref="message_list">
        <li class="message" v-for="message in messages" :key="message.id"
          :class="{ you: currentUser.id == message.user.id }">
          <header class="message--header">
            <p class="message--sender">{{ message.user.name }}</p>
          </header>
          <div class="message--content">
            <p class="message--title">{{ message.title }}</p>
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
  props: ["chatroom"],
  data() {
    return {
      messages: [
        {
          id: 1,
          user: {
            id: 1,
            name: "user 1",
          },
          title: "title 1",
          content: "lorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit amet",
        },
        {
          id: 2,
          user: {
            id: 2,
            name: "user 2",
          },
          title: "title 1",
          content: "lorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit amet",
        },
        {
          id: 3,
          user: {
            id: 3,
            name: "user 3",
          },
          title: "title 1",
          content: "lorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit amet",
        },
      ],
      currentUser: {
        id: 1,
        name: "user 1",
      },
      message_value: ""
    }
  },
  mounted() {
    socket.on('emit_message', (message) => {
      this.messages.push(message)
    })
  },
  methods: {
    onReturnClick() {
      this.$emit('returnClicked');
    },
    sendMessage() {
      let message = {
        user: {
          id: 1,
          name: "user 1",
        },
        content: this.message_value,
        room: this.chatroom
      }

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
  justify-content: space-between;
  align-items: center;
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
</style>
