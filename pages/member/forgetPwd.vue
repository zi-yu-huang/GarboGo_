<template lang="pug">
//- 請填寫頁面👈
#ForgetPwd
  ForgetModalStep1(v-if="isShowDoneStep1", @DoneStep1="DoneStep1")
  ForgetModalStep2(v-if="isShowDoneStep2", @DoneStep2="DoneStep2" :otpId="otpId")
  ForgetModalStep3(v-if="isShowDoneStep3", @DoneStep3="DoneStep3")
</template>

<script>
export default {
  components: {
    ForgetModalStep1: () => import("@/components/login/forgetModalStep1.vue"),
    ForgetModalStep2: () => import("@/components/login/forgetModalStep2.vue"),
    ForgetModalStep3: () => import("@/components/login/forgetModalStep3.vue"),
  },
  name: "ForgetPwd",
  layout: "default",

  data() {
    return {
      isShowDoneStep1: true,
      isShowDoneStep2: false,
      isShowDoneStep3:false,
      otpId:""
    };
  },

  methods: {
    DoneStep1(form,val) {
      console.log(form,val)
      
      this.isShowDoneStep1 = false;
      this.isShowDoneStep2 = true;
      this.otpId=val
    },
    DoneStep2() {
      this.isShowDoneStep2 = false;
      this.isShowDoneStep3 = true;
    },
    DoneStep3(){     
      this.isShowDoneStep3=false
      this.$router.push("/member/login")
    }
  },
};
</script>

<style lang="scss" scoped>
// 排版
#ForgetPwd {
}
// 元件
#ForgetPwd {
}
</style>
