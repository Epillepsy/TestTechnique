<template>
  <div class="detail">
    <div class="messageContact">
      {{ message.contact.firstname }} {{ message.contact.lastname }}
      {{ message.contact.phone }}
      {{ message.contact.email }}
    </div>
    <div class="messageBody">
      <h2>
        {{ message.contact.firstname }} {{ message.contact.lastname }}
      </h2>
      <span>{{ message.date }}</span>
      <div>
        {{ message.body }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessageDetails',
  props: {
    message: {
      type: Object,
      default: () => {},
      required: true
    }
  }
};
</script>
