<template>
  <Layout>
    <RestaurantList />
    <Map />
    <div>
      <Chat v-if="!inChatroom" @chatroomClicked="onChatroomClicked" />
      <Chatroom v-else :chatroom="chatroom" @returnClicked="onReturnClicked" />
    </div>
  </Layout>
</template>

<script>
export default {
  data() {
    return {
      inChatroom: false,
      chatroom: null
    };
  },
  methods: {
    toggleChatroom() {
      this.inChatroom = !this.inChatroom;
    },
    onChatroomClicked(chatroom) {
      this.chatroom = chatroom;
      this.toggleChatroom()
    },
    onReturnClicked() {
      this.toggleChatroom();
    }
  },
}
</script>
