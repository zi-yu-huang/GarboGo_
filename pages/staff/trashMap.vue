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
  methods: {
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
