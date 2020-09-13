<template>
  <header class="header">
    <el-row>
      <el-col
        :lg="21"
        :md="18"
        :xs="19"
        :sm="19"
      >
        <img
          :src="logo"
          class="logo"
          :class="{mobile: isMobile}"
        >
        <span class="readIcon">
          <i class="el-icon-message" />
          <span
            class="text"
          >
            {{ currentRealtor.unread_messages }}
          </span>
        </span>
      </el-col>
      <span class="vertical-separator" />
      <el-col
        :lg="3"
        :md="6"
        class="realtor"
        :xs="5"
        :sm="5"
      >
        <img
          class="icon"
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
    this.getRealtors().then(() => {
      this.updateCurrentRealtor(this.realtors[0].id);
    });
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
  padding: 0 0 0 10px;
}

.logo {
  margin-top: 6px;
  vertical-align: middle;
  & > .mobile {
    width: 150px;
  }
}
.vertical-separator {
  height: 100%;
  width: 1px;
  position: absolute;
  background-color: white;
}
.realtor {
  padding: 0px 10px;
  background-color: $deep-blue;
  & > .icon {
    height: 32px;
    border-radius: 50px;
    vertical-align: middle;
  }
}
.el-dropdown {
  color: $header-color !important;
}
.el-icon-message {
  vertical-align: middle !important;

}
.readIcon {
  margin-left: 10px;
  background-color: $green;
  padding: 5px;
  border-radius: 8px;
  vertical-align: middle;

  & > .text {
    margin-left: 5px;
    font-size: 12px;
  }
}

.realtorName {
  margin-left: 10px;
}
</style>
