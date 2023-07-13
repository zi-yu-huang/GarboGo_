<template lang="pug">
//- 請填寫頁面👈
#MemberIndex
  p MemberIndex
</template>

<script>
import debounce from "lodash/debounce";
export default {
  name: "MemberIndex",
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
#MemberIndex {
}
// 元件
#MemberIndex {
}
</style>
