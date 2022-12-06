<template>
  <article class="chat">
    <ChatroomSelection v-if="!chatroom" @chatroomClicked="onChatroomClicked" :rooms="rooms" />
    <Chatroom v-else :user="this.user" :chatroom="this.chatroom" @returnClicked="onReturnClicked" />
  </article>
</template>

<script>
import socket from '@/services/socket-client.js'

export default {
  props: ['user', 'rooms'],
  data() {
    return {
      chatroom: null
    }
  },
  watch: {
    rooms() {
      this.chatroom = this.rooms.find(room => room.id === this.chatroom?.id)
    }
  },
  mounted() {
    socket.connect()
    console.log('socket connected')
  },
  beforeDestroy() {
    socket.disconnect()
    console.log('socket disconnected')
  },
  methods: {
    onChatroomClicked(chatroom) {
      socket.emit('user_joined_room', chatroom, this.user, (room) => {
        this.chatroom = room
      })
    },
    onReturnClicked() {
      socket.emit('user_left_room', this.chatroom, this.user)
      this.chatroom = null
    }
  }
}
</script>
