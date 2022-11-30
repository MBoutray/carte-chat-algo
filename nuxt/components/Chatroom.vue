<template>
  <p>chatroom</p>

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
      ]
    }
  },
  props: ['name', 'messages']
}
</script>
