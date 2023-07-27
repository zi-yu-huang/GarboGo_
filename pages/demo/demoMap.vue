<template lang="pug">
//- 請填寫功能描述👈
#DemoMap
  TrashMap

</template>

<script>
export default {
  name: "DemoMap",
  components:{
    TrashMap:()=>import("@/components/map/trashMap")
  },
  data () {
    return {
    };
  }
};
</script>

<style lang="scss" scoped>
// 排版
#DemoMap {
}
// 元件
#DemoMap {
}
</style>
