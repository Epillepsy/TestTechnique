<template>
  <header class="header">
    <el-row>
      <el-col
        :sm="20"
        :xs="16"
      >
        <img
          :src="logo"
          class="logo"
        >
        <span class="readIcon">
          <i class="mypro-icon mypro-icon-mail" />
          <span
            class="text"
          >
            {{ currentRealtor.unread_messages }}
          </span>
        </span>
      </el-col>
      <el-col
        :sm="4"
        :xs="{offset: 4, span: 4}"
      >
        <img
          class="logo realtor"
          :src="currentRealtor.logo"
        >
        <el-dropdown @command="updateCurrentRealtor">
          <span>
            <span
              v-if="!isMobile"
              class="realtorName"
            >
              {{ currentRealtor.name }}
            </span>
            <i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="realtor in realtors"
              :key="realtor.id"
              :command="realtor.id"
            >
              {{ realtor.name }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import logo from '@/assets/logo-meilleursagentspro-neg.svg';

export default {
  name: 'Header',
  data() {
    return ({
      logo
    });
  },
  computed: {
    ...mapGetters({
      realtors: 'store/realtors',
      currentRealtor: 'store/realtor'
    })
  },
  mounted() {
    this.getRealtors();
  },
  methods: {
    ...mapActions({
      getRealtors: 'store/getRealtors',
      getRealtor: 'store/getRealtor'
    }),
    updateCurrentRealtor(realtorId) {
      this.getRealtor(realtorId);
      this.$router.push({ name: 'messagesList', params: { realtorId } });
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/main.scss";

.header {
  height: 60px;
  background-color: $main-color;
  color: $header-color;
  line-height: 60px;
  white-space: nowrap;
}

.logo {
  vertical-align: middle;
}
.realtor {
  height: 32px;
  border-radius: 50px;
}
.el-dropdown {
  color: $header-color !important;
}
.readIcon {
  margin-left: 10px;
  background-color: $green;
  padding: 5px;
  border-radius: 8px;
  & > .text {
    margin-left: 5px;
    font-size: 15px;
  }
}

.realtorName {
  margin-left: 10px;
}
</style>
