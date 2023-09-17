<template lang="pug">
//- 請填寫頁面👈
#MemberMap
  TrashMap
</template>

<script>
import debounce from "lodash/debounce";
export default {
  name: "MemberMap",
  components:{
    TrashMap:()=>import('@/components/map/trashMap.vue')
  },
  layout: "default",
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
#MemberMap {
}
// 元件
#MemberMap {
}
</style>
