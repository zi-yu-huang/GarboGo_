<template lang="pug">
//- 請填寫頁面👈
#MemberRegister
  MenuList
  RegisterStep1
  MenuFooter
</template>

<script>
import debounce from "lodash/debounce";
export default {
  components:{
    MenuList:()=>import("@/components/footer/menuList"),
    RegisterStep1:()=>import("@/components/register/registerStep1"),
    MenuFooter:()=>import("@/components/footer/MenuFooter")
  },
  name: "Member#MemberRegister",
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
#MemberRegister {
}
// 元件
#MemberRegister {
}
</style>
