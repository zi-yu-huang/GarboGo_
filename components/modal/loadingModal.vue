<template lang="pug">
#LoadingModal
  .loading-mask
    .block-area
      aSpin(size="large")
</template>

<script>
export default {
};
</script>

<style lang="scss" scoped>
#LoadingModal {
  z-index: 1001;

  .loading-mask {
    z-index: 1001;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(55, 55, 55, 0.6);
  }

  .block-area {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 1001;
  }
}
</style>
