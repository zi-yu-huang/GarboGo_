<template lang="pug">
//- 請填寫頁面👈
#MemberProfile
  .user-area
    .circle-area
      aIcon.icon-area(type="user")
    .user-text {{ "使用者暱稱" }}
  .edit-area
    ProfileInput(:notEdit="notEdit" @openPhone="OpenPhone" @openPassword="OpenPassword")
    .btn-content
      aButton.btn-area(type=primary @click="ChangeEditBtn") {{ editText }}
        aIcon(:type="changeEdit")
  EditPhone(:visible = "openPhone" @getVerify="GetVerify")
  EditVerify(:visible="getVerify" @verifyDone="VerifyDone")
  EditPassword(:visible="openPassword" @donePassword="DonePassword")
</template>

<script>
import debounce from "lodash/debounce";
export default {
  layout:'staff',
  components:{
    ProfileInput:()=>import("@/components/profile/profileInput"),
    EditPhone:()=>import("@/components/profile/EditPhone"),
    EditVerify:()=>import("@/components/profile/EditVerificationCode"),
    EditPassword:()=>import("@/components/profile/EditPassword")

  },
  name: "MemberProfile",
  data () {
    return {
      getVerify:false,
      openPhone:false,
      openPassword:false,
      notEdit:true,
      editText:""
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
    changeEdit(){
      if(this.notEdit === true){
        this.editText="修改"
        return "edit"
      }
      else{
        this.editText="儲存"
        return "save"
      }
    }
  },
  methods: {
    MountedActivated: debounce(function () {
      // init
    }, 10),
    DeactivatedDestory () {
      // destory
    },
    ChangeEditBtn(){
      if(this.notEdit ===true){
        this.notEdit = false
      }
      else this.notEdit =true
    },
    OpenPhone(val){
      this.openPhone = val
    },
    GetVerify(val){
      this.getVerify = val
      this.openPhone = false
    },
    VerifyDone(){
      this.getVerify = false
    },
    OpenPassword(val){
      this.openPassword= val
    },
    DonePassword(){
      this.openPassword = false
    }
  }
};
</script>

<style lang="scss" scoped>
// 排版
#MemberProfile {
  background-color: white;
  .user-area{
  background-color: white;
  padding-bottom: 20px;

}

  .btn-content{
    bottom: 90px;
    position: absolute;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
// 元件
#MemberProfile {
  .user-area{
    display: flex;
    padding-top: 14%;
    flex-direction: column;
    align-items: center;
    .circle-area{
      width: 85px;
      height: 85px;
      border-radius: 50%;
      background-color: #DBEFBF;
      display: flex;
      align-items: center;
      justify-content: center;
      .icon-area{
        align-items: center;
        font-size: 55px;
        color: black;
        margin-bottom: 10px;
      }
    }
    .user-text{
      font-size: 24px;
      color: black;
    }
  }
  
  .btn-area{
    border-radius: 30px;
    height: 47px;
    color: black;
    font-size: 20px;
    padding: 0 10px;
    border: 3px solid #68B000;
  }
}
.html{
 background-color: rgb(255, 0, 0) !important; 
}
</style>
