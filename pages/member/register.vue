<template lang="pug">
//- 註冊頁面
#MemberRegister
  MenuList
  RegisterStep1(v-if='current=="page1"' @DoneStep1="DoneStep1")
  RegisterStep2(v-if='current =="page2"' @DoneStep2="DoneStep2")
  RegisterStep3(v-if='current =="page3"' @DoneStep3="DoneStep3")
  DoneVerify(v-if='current =="page4"')
  MenuFooter
</template>

<script>
import debounce from "lodash/debounce";
export default {
  components:{
    MenuList:()=>import("@/components/footer/menuList"),
    RegisterStep1:()=>import("@/components/register/registerStep1"),
    RegisterStep2:()=>import("@/components/register/registerStep2"),
    RegisterStep3:()=>import("@/components/register/registerStep3"),
    DoneVerify:()=>import("@/components/register/doneVerify"),
    MenuFooter:()=>import("@/components/footer/MenuFooter")
  },
  name: "MemberRegister",
  layout: "private",
  data () {
    return {
      doneStep1:"",
      doneStep2:"",
      doneStep3:""
    };
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
  computed:{
    current() {
      if (this.doneStep1 === "" && this.doneStep2 === "") {
        return "page1";
      }
      if (this.doneStep1 === true && this.doneStep2 === "") {
        return "page2";
      }
      if(this.doneStep2 ===true &&this.doneStep3 === ""){
        return "page3";
      }
      return "page4"
    }
  },
  methods: {
    MountedActivated: debounce(function () {
      // init
    }, 10),
    DeactivatedDestory () {
      // destory
    },
    DoneStep1(val){
      this.doneStep1 = val

    },
    DoneStep2(val){
      this.doneStep2 = val
    },
    DoneStep3(val){
      
      this.doneStep3 = val
      
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
