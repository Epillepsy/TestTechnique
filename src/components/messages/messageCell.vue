<template>
  <div
    class="message"
    :class="{read: message.read}"
    @click="$emit('click', message.id)"
  >
    <el-row>
      <el-col :span="20">
        <i :class="type[message.type].icons" />
        <div class="contactName">
          {{ message.contact.firstname }} {{ message.contact.lastname }}
        </div>
      </el-col>
      <el-col :span="4">
        <span>{{ message.date }}</span>
      </el-col>
    </el-row>
    <div>{{ type[message.type].text }}</div>
    <!-- missing phone duration on api return -->
    <div
      v-if="message.type ==='email'"
      class="body"
    >
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
  },
  data() {
    return ({
      type: {
        phone: { icons: 'el-icon-phone', text: 'Appel téléphonique depuis MeilleursAgents' },
        email: { icons: 'el-icon-message', text: 'Message sur votre vitrine MeilleursAgents' }
      }
    });
  }
};
</script>
<style lang="scss">
  .message {
    background-color: white;
    margin-bottom: 10px;
    cursor: pointer;
    padding: 10px;
  }
  .body {
    height: 20px;
    overflow:hidden
  }
  .contactName {
    display: inline;
  }
</style>
