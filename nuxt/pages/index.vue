<template>
  <Layout>
    <RestaurantList />
    <Map />
    <div>
      <Chat v-if="!inChatroom" />
      <Chatroom v-else />
    </div>
  </Layout>
</template>

<script>
export default {
  data() {
    return {
      inChatroom: false,
    };
  },
}
</script>
