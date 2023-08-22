<template lang="pug">
//- 請填寫功能描述👈
#AlertDemo
  .alert-area
    aAlert.alert-text(:message="alertMsg" :type="alertType", description=" ", show-icon) 
</template>

<script>
export default {
  name: "AlertDemo",
  props:{
    alertMsg:{
      type:String,
      default:""
    },
    alertType:{
      type:String,
      default:""
    }
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
// 排版
#AlertDemo {
  .alert-area {
    z-index: 999;
    position: absolute;
    width: 100vw;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .alert-text {
    // width: 250px;
    height: 56px;
    justify-content: flex-start;
    background-color: white;
    border: 1px solid white;
    display: flex;
  }
}
// 元件
#AlertDemo {
}
</style>
