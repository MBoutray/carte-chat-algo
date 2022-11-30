<template>
  <article class="chatroom">
    <button @click.prevent="onReturnClick">Return</button>
    <p>#{{ chatroom.id }} : {{ chatroom.name }}</p>
  </article>

</template>

<script>
export default {
  data() {
    return {
      messages: [
        {
          id: 1,
          content: "message 1",
        }
      ],
      chatroom: {
        id: 1,
        name: "room 1",
      }
    }
  },
  methods: {
    onReturnClick() {
      this.$emit('returnClicked');
    },
  }
}
</script>
