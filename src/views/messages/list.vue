<template>
  <div class="list-wrapper">
    <infinite-scroll
      id="list"
      class="list"
      :min-distance="40"
      @load-more="loadMessages"
    >
      <div
        v-for="(message, index) in messages"
        :key="message.id"
        v-loading="loading"
      >
        <Message
          :message="message"
          @click="selectMessage(message, index)"
        />
      </div>
    </infinite-scroll>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Message from '@/components/messages/messageCell.vue';
import InfiniteScroll from '@tygr/vue-infinite-scroll';

export default {
  name: 'MessagesList',
  components: {
    Message,
    'infinite-scroll': InfiniteScroll
  },
  data() {
    return ({
      params: {
        page: 1,
        page_size: 10,
        increment: false
      },
      loading: false
    });
  },
  computed: {
    ...mapGetters({
      realtor: 'store/realtor',
      messages: 'store/messages'
    })
  },
  watch: {
    realtor: {
      handler(value, oldValue) {
        // We don't want to reload if we just refresh
        // the message counter
        // old value is undefined on first load
        if ((value || {}).id !== (oldValue || {}).id) {
          this.params.increment = false;
          this.params.page = 1;
          this.params.page_size = 5;
          this.loadData();
          const listElem = document.getElementById('list');
          (listElem || {}).scrollTop = 0;
        }
      },
      immediate: true
    },
    params: {
      deep: true,
      handler() {
        this.loadData();
      }
    }
  },
  methods: {
    ...mapActions({
      getRealtorMessages: 'store/getRealtorMessages',
      editMessage: 'store/editMessage',
      getRealtor: 'store/getRealtor'
    }),
    loadData() {
      this.loading = true;
      if (this.realtor) {
        this.getRealtorMessages({ ...this.params, id: this.realtor.id })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    selectMessage(message, index) {
      if (!message || !this.realtor) { return; }
      this.setMessageToRead(message, index);
      this.$router.push({ name: 'messagesDetails', params: { messageId: message.id, realtorId: this.realtor.id } }).catch(() => {});
    },
    async setMessageToRead(message, index) {
      const { realtorId } = this.$route.params;
      if (!realtorId || message.read) { return; }
      try {
        const { data } = await this.editMessage({
          body: { read: true }, params: { realtorId, messageId: message.id }
        });
        this.$set(this.messages, index, data);
        this.getRealtor(realtorId);
      } catch (e) {
        console.log(e);
      }
    },
    loadMessages() {
      if (this.loading) { return; }
      this.loading = true;
      this.params.page += 1;
      this.params.increment = true;
    }
  }
};
</script>

<style lang="scss">
.list-wrapper {
  height: calc(100vh - 60px);
}
.list {
  overflow: auto;
  margin-bottom: 20px;
}
.down {
  height: inherit !important;
}
</style>
