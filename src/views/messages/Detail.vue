<template>
  <div>
    <Message
      v-if="message"
      :message="message"
    />
    <div v-else>
      no messages
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Message from '@/components/messages/messageDetail.vue';

export default {
  name: 'MessageDetails',
  components: {
    Message
  },
  computed: {
    ...mapGetters({
      message: 'store/message'
    })
  },
  watch: {
    '$route.params.messageId': {
      immediate: true,
      async handler() {
        this.setMessageToRead();
      }
    }
  },
  mounted() {
    console.log(this.$route.params);
  },
  methods: {
    ...mapActions({
      getMessageDetails: 'store/getMessageDetails',
      editMessage: 'store/editMessage',
      getRealtor: 'store/getRealtor'
    }),
    async setMessageToRead() {
      const { realtorId, messageId } = this.$route.params;
      if (!realtorId || !messageId) { return; }
      try {
        await this.getMessageDetails({ realtorId, messageId });
        if (this.message.read) { return; }
        await this.editMessage({
          body: { ...this.message, read: true }, params: { realtorId, messageId }
        });
        this.getRealtor(realtorId);
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
<style lang="scss">
.detail {
  background-color: red
}
</style>
