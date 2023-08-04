<template lang="pug">
//- 請填寫功能描述👈
#GarbageModal(v-if="visible")
  p GarbageModal
</template>

<script>
export default {
  name: "GarbageModal",
  props:{
    visible:{
      type:Boolean,
      default:false
    }
  },
  data () {
    return {};
  }
};
</script>

<style lang="scss" scoped>
// 排版
#GarbageModal {
}
// 元件
#GarbageModal {
}
</style>
