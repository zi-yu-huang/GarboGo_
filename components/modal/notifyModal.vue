<template lang="pug">
//- 請填寫功能描述👈
#NotifyModal
  p NotifyModal
  div(v-if="notifyVisible")
    div.mask
    div.block-area
      div.block
</template>

<script>
export default {
  name: "NotifyModal",
  props:{
    notifyVisible:{
      type:Boolean,
      default:""
    }
  },
  data () {
    return {};
  }
};
</script>

<style lang="scss" scoped>
// 排版
#NotifyModal {
  .block-area{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 1000;
  }
  .block{
    // position: relative;
    // min-width: 100px;
    // min-height: 50px;
    background: #fff;
    border: 5px;
    border-radius: 20px;
    // box-shadow:0 4px 12px rgb(0 0 0 / 15%);
    margin: 10px 3%;
    padding: 20px 0 0 0;
  }
  .mask{
    z-index: 0;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(55, 55, 55, 0.6);
  }
}
// 元件
#NotifyModal {
}
</style>
