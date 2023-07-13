<template lang="pug">
//- 請填寫頁面👈
#CollectIndex
  p CollectIndex
</template>

<script>
import debounce from "lodash/debounce";
export default {
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
}
// 元件
#CollectIndex {
}
</style>
