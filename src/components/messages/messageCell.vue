<template>
  <div
    class="message"
    :class="{read: message.read}"
    @click="$emit('click', message.id)"
  >
    <h2>{{ message.contact.firstname }} {{ message.contact.lastname }}</h2>
    <span>{{ message.date }}</span>
    <h4>{{ message.type }}</h4>
    <div class="body">
      {{ message.body }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessageCell',
  props: {
    message: {
      type: Object,
      required: true,
      default: () => {}
    }
  }
};
</script>
<style lang="scss">
  .message {
    background-color: gray;
    margin-bottom: 10px;
    cursor: pointer;
  }
  .body {
    height: 20px;
    overflow:hidden
  }
</style>
