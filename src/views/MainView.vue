<template>
  <ElRow>
    <ElCol
      v-if="showLeftPanel"
      :span="layoutColValues.leftPanel.span"
    >
      <RouterView
        :key="$route.fullpath"
        name="leftpanel"
      />
    </ElCol>
    <ElCol
      v-if="showContent"
      :span="layoutColValues.content.span"
      :offset="layoutColValues.content.offset"
    >
      <span ref="content">
        <RouterView
          :key="$route.fullpath"
          name="content"
        />
      </span>
    </ElCol>
  </ElRow>
</template>
<script>
export default {
  name: 'MainView',
  data() {
    return {};
  },
  computed: {
    layoutColValues() {
      if (this.showContent && this.showLeftPanel) {
        return { content: { span: 15, offset: 1 }, leftPanel: { span: 8 } };
      }
      return { content: { span: 24 }, leftPanel: { span: 24 } };
    },
    showContent() {
      if (this.$route.name === 'messagesList' && this.isMobile) {
        return false;
      }
      return true;
    },
    showLeftPanel() {
      if (this.$route.name === 'messagesDetails' && this.isMobile) {
        return false;
      }
      return true;
    },
  },
};
</script>
