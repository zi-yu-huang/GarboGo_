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
  methods: {
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
