<template>
  <div
    class="message"
    :class="{bold: !message.read}"
    @click="$emit('click')"
  >
    <el-row>
      <el-col :span="19">
        <i
          class="icon"
          :class="type[message.type].icons"
        />
        <span class="contactName">
          {{ message.contact.firstname }} {{ message.contact.lastname }}
        </span>
        <span
          v-if="message.type === 'phone'"
          class="phone"
        >({{ message.contact.phone }})</span>
      </el-col>
      <el-col :span="5">
        <span class="date">{{ getDate(message.date) }}</span>
      </el-col>
    </el-row>
    <div class="messageType">
      {{ type[message.type].text }}
    </div>
    <!-- missing phone duration on api return -->
    <div
      v-if="message.type ==='email' || message.type === 'sms'"
      class="body"
    >
      {{ message.body }}
    </div>
  </div>
</template>

<script>
import dateFormat from '@/helpers/dateFormatter';

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
        email: { icons: 'el-icon-message', text: 'Message sur votre vitrine MeilleursAgents' },
        sms: { icons: 'el-icon-chat-dot-round', text: 'SMS depuis MeilleursAgents' },
      }
    });
  },
  methods: {
    getDate(date) {
      return dateFormat(date);
    }
  }
};
</script>
<style lang="scss">
@import '@/scss/main.scss';


.message {
  background-color: white;
  cursor: pointer;
  padding: 10px;
  border-bottom: 1px solid $background-color;
}
.body {
  height: 20px;
  overflow:hidden;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  color: $light-text;
  margin-top: 5px;
  margin-left: 20px;
}
.contactName {
  display: inline;
  font-size: 18px;
}
.phone {
  font-size: 16px;
}
.messageType {
  margin-top: 5px;
  font-size: 14px;
  color: $light-text;
  margin-left: 20px;
}
.date {
  font-size: 12px;
  float: right;
}
.icon {
  color: $light-text
}
.bold {
  .date {
    color: $text-blue;
  }
  .contactName {
    color: black;
    font-weight: 500;
  }
  .messageType {
    color: black;
  }
  .icon {
    color: $text-blue
  }
}
</style>
