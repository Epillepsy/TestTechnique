<template>
  <div>
    <Message
      v-if="message"
      :message="message"
    />
    <div v-else>
      Aucun message selectionné
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
      async handler(value) {
        if (value) {
          this.getMessageDetails({
            realtorId: this.$route.params.realtorId,
            messageId: this.$route.params.messageId
          });
        }
      }
    }
  },
  mounted() {
  },
  methods: {
    ...mapActions({
      getMessageDetails: 'store/getMessageDetails',
    }),
  }
};
</script>
