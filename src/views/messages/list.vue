<template>
  <infinite-scroll
    class="list"
    :min-distance="40"
    @load-more="loadMessages"
  >
    <div
      v-for="message in messages"
      :key="message.id"
      v-loading="loading"
    >
      <Message
        :message="message"
        @click="selectMessage"
      />
    </div>
  </infinite-scroll>
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
      handler() {
        this.params.increment = false;
        this.params.page = 1;
        this.params.page_size = 5;
        this.loadData();
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
      getRealtorMessages: 'store/getRealtorMessages'
    }),
    loadData() {
      this.loading = true;
      this.getRealtorMessages({ ...this.params, id: this.realtor.id })
        .finally(() => {
          this.loading = false;
        });
    },
    selectMessage(messageId) {
      this.$router.push({ name: 'messagesDetails', params: { messageId, realtorId: this.realtor.id } }).catch(() => {});
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
.list {
  background-color: green;
  overflow: auto;
  height: 800px ! important;
}

</style>
