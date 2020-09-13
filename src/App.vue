<template>
  <div class="base">
    <el-row>
      <el-col>
        <Header />
      </el-col>
    </el-row>
    <el-row>
      <el-col>
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

  <style lang="scss" src="@/scss/main.scss"></style>
  <style lang="css" src="@/scss/mypro-icon.css"></style>
<style lang="scss">
@import "@/scss/main.scss";

.base {
  width: 100%;
  top: 0px;
  left: 0px;
  bottom: 0px;
  position: absolute;
  // height: 100vh;
  background-color: $background-color;
  overflow: hidden;
}
</style>
