<template>
  <div class="base">
    <el-row>
      <el-col
        :span="22"
        :offset="1"
      >
        <Header />
      </el-col>
    </el-row>
    <el-row>
      <el-col
        :span="22"
        :offset="1"
      >
        <RouterView />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Header from '@/views/messages/Header.vue';

export default {
  name: 'App',
  components: {
    Header,
  }
};
</script>

<style lang="scss">
.base {
  width: 100%;
  top: 0px;
  position: absolute;
}
</style>

<style lang="scss" src="@/scss/main.scss"></style>
<style lang="css" src="@/scss/mypro-icon.css"></style>
