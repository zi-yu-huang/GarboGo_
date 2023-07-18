<template lang="pug">
//- 請填寫頁面👈
#CollectIndex
  MenuList
  CollectTable
  MenuFooter
</template>

<script>
import debounce from "lodash/debounce";
export default {
  components:{
    MenuList:()=>import("@/components/footer/menuList"),
    MenuFooter:()=>import("@/components/footer/MenuFooter"),
    CollectTable:()=>import("@/components/collect/collectTable")
  },
  name: "CollectIndex",
  layout: "private",
  data () {
    return {};
  },
  mounted () {
    this.MountedActivated();
  },
  activated () {
    this.MountedActivated();
  },
  deactivated () {
    this.DeactivatedDestory();
  },
  beforeDestroy () {
    this.DeactivatedDestory();
  },
  methods: {
    MountedActivated: debounce(function () {
      // init
    }, 10),
    DeactivatedDestory () {
      // destory
    }
  }
};
</script>

<style lang="scss" scoped>
// 排版
#CollectIndex {
  background-color: rgba(170, 216, 105, 0.8);
  height: 100vh;
}
// 元件
#CollectIndex {
}
</style>
