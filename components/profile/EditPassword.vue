<template lang="pug">
//- 修改密碼👈
#EditPassword
  .content
    aFormModel.form-area(
      ref="ruleForm"
      :model="memberForm"
      :rules="rules"
      )
      aFormModelItem(ref="oldPassword" prop="oldPassword")
        aInput.input-font(
          placeholder="請輸入原密碼"
          v-model="memberForm.oldPassword"
          :maxLength="9"
          )
      aFormModelItem(ref="newPassword" prop="newPassword")
        aInput.input-font(
          placeholder="請輸入新密碼"
          v-model="memberForm.newPassword"
          :maxLength="9"
          )
      aFormModelItem(ref="newPasswordAgain" prop="newPasswordAgain")
        aInput.input-font(
          placeholder="請再次輸入新密碼"
          v-model="memberForm.newPasswordAgain"
          :maxLength="9"
          )
      aFormModelItem
        aButton.btn-area(type="primary" @click="OnSubmit") {{"確認 "}}
</template>

<script>
export default {
  name: "EditPassword",
  data () {
    return {
      memberForm:{
        oldPassword: "",
        newPassword: "",
        newPasswordAgain:""
      },
      rules: {
        oldPassword: [
          { required: true,message: "不可為空"},
          { validator: this.rValidataPhoneFormat, trigger: "blur" }
        ],
        newPassword: [
          { required: true,message: "不可為空"},
          { validator: this.rValidataPhoneFormat, trigger: "blur" }
        ],        
        newPasswordAgain: [
          { required: true,message: "不可為空"},
          { validator: (rule, value, cbfn) => {
              const form = this.memberForm;
              if (value && value !== form.newPassword) {
                cbfn("兩次密碼不一致!");
              } else {
                cbfn();
              }
            },
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods:{
    OnSubmit(){
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log(this.memberForm.newPassword)
          this.memberForm.oldPassword=""
          this.memberForm.newPassword=""
          this.memberForm.newPasswordAgain=""
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
// 排版
#EditPassword {
  .content{
    text-align: center;
    justify-content: center; 
      .form-area{
        display: flex;
        flex-direction: column;
        height: 309px;
        justify-content: center;
    }
    .btn-area{
      width: -webkit-fill-available;
      text-align: center;
    }
  }
}
// 元件
#EditPassword {
  .content{
    background: black;
    opacity:80%;
    margin: 0px 21px;
    // width: 346px;
    // height: 309px;
    border-radius: 24px;
    padding: 0px 27px;
    .input-font{
      text-align: center;
    }
  }
}
</style>
