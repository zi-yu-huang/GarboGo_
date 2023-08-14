<template lang="pug">
//- 登入頁面👈
#StaffLogin
  StaffLoginModal
</template>

<script>
import debounce from "lodash/debounce";
export default {
  layout:'staff',

  components:{
    StaffLoginModal:()=>import("@/components/login/staffLoginModal"),
  },
  name: "StaffLogin",
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
#StaffLogin {
}
// 元件
#StaffLogin {
}
</style>
