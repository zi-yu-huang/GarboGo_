<template lang="pug">
//- 請填寫頁面👈
#StaffMap
  TrashMap
</template>

<script>
import debounce from "lodash/debounce";
export default {
  name: "StaffMap",
  components:{
    TrashMap:()=>import('@/components/map/garbageTruckData.vue')
  },
  layout: "staff",
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
#StaffMap {
}
// 元件
#StaffMap {
}
</style>
