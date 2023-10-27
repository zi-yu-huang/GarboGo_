<template lang="pug">
//- 登入頁面👈
#Login
  LoginModal
</template>

<script>
import debounce from "lodash/debounce";
export default {
  layout:'default',

  components:{
    LoginModal:()=>import("@/components/login/loginModal"),
  },
  name: "Login",
  data () {
    return {};
  },
  methods: {
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
