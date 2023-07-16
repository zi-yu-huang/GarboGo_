<template lang="pug">
//- 登入頁面👈
#Login
  MenuList
  LoginModal
  MenuFooter
</template>

<script>
import debounce from "lodash/debounce";
export default {
  components:{
    MenuList:()=>import("@/components/footer/menuList"),
    LoginModal:()=>import("@/components/login/loginModal"),
    MenuFooter:()=>import("@/components/footer/MenuFooter")
  },
  name: "Login",
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
#Login {
}
// 元件
#Login {
}
</style>
