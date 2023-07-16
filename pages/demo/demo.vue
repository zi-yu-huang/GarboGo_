<template lang="pug">
//- 請填寫功能描述👈
#Demo
  EditPhone
  EditVerificationCode
  EditPassword
  MenuList
  MenuFooter
  //- aIcon(type="heart" :style="{color:iconColor,theme:filled}")
  aIcon.icon-area(type="heart" :theme="iconTheme" :style="{color:iconColor}" @click="OpenModal")
  //- aButton(type=primary @click="OpenModal") {{"open"}}
  modalDemo(:visible="visible"  @CloseModal="CloseModal")
    template(v-slot:article) {{"加入我的最愛"}}

</template>

<script>
export default {
  name: "Demo",
  components: {
  EditPhone: () => import("@/components/profile/EditPhone"),
  EditPassword:()=>import("@/components/profile/EditPassword"),
  EditVerificationCode: () => import("@/components/profile/EditVerificationCode"),
  MenuFooter:()=> import("@/components/footer/MenuFooter"),
  MenuList:()=>import("@/components/footer/menuList"),
  modalDemo:()=>import("@/components/modal/modalDemo")
  },
  data () {
    return {
        visible:false,
        iconColor:"",
        iconTheme:"outlined"
    };
  },
  methods:{
    OpenModal(){
        this.visible=true;
    },
    CloseModal(val,like){
        this.visible= val;
        if(like == true){
        // console.log("change",this.$refs.icon)
        this.iconColor="#E70000"
        this.iconTheme="filled"
        }
    }
  }
};
</script>

<style lang="scss" scoped>
// 排版
#Demo {
}
// 元件
#Demo {
  .icon-area{
  font-size: 20px;
  }
}
</style>
