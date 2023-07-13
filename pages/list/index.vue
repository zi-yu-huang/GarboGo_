<template lang="pug">
//- 請填寫頁面👈
#ListIndex
  p ListIndex
</template>

<script>
import debounce from "lodash/debounce";
export default {
  name: "ListIndex",
  layout: "private",
  data () {
    return {};
  },
  mounted () {
    console.log("fheihr")
    
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
#ListIndex {
}
// 元件
#ListIndex {
}
</style>
