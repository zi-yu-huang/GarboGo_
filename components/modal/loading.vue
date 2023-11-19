<template lang="pug">
//- 請填寫功能描述👈
#Loading
  .loading-mask( v-if="loadingVisible")
    .block-area
      aSpin(size="large")
</template>

<script>
export default {
  props: {
    loadingVisible: {
      type: Boolean,
      default: "",
    },
  },
  name: "Loading",
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
// 排版
#Loading {
  .loading-mask{
    z-index: 1000;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(55, 55, 55, 0.6);
  }
  .block-area{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 1001;
  }
}
// 元件
#Loading {
}
</style>
