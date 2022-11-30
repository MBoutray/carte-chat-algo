<template>
  <article class="chat">
    <ChatroomSelection v-if="!chatroom" @chatroomClicked="onChatroomClicked" />
    <Chatroom v-else :chatroom="this.chatroom" @returnClicked="onReturnClicked" />
  </article>
</template>

<script>
import socket from '@/services/socket-client.js'

export default {
  data() {
    return {
      chatroom: null
    }
  },
  mounted() {
    // socket.auth = {
    //   conv_id: this.conv._id,
    //   token: session.getToken(),
    // };

    socket.connect()
    console.log('socket connected')

    // Set events
    // socket.on("connect_error", (err) => {
    //   console.error(err);
    // });

    // socket.on("user_id", (userId) => {
    //   this.userId = userId;
    // });

    // socket.on("all_messages", (messages) => {
    //   this.messages = messages;
    // });

    // socket.on('new_message', (message) => {
    //   this.messages.push(message)
    // })
    // socket.on('emit_message', (message) => {
    //   this.messages.push(message)
    // })
  },
  beforeDestroy() {
    socket.disconnect()
    console.log('socket disconnected')
  },
  methods: {
    onChatroomClicked(chatroom) {
      this.chatroom = chatroom
      socket.emit('user_joined_room', chatroom)
    },
    onReturnClicked() {
      socket.emit('user_left_room', this.chatroom)
      this.chatroom = null
    }
  }
}
</script>
