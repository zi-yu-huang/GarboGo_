<template lang="pug">
//- 修改密碼👈
#EditPassword
  .block-area(v-if="visible")
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
  props:{
    visible:{
      type:Boolean,
      default:""
    }
  },
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
          this.memberForm.oldPassword=""
          this.memberForm.newPassword=""
          this.memberForm.newPasswordAgain=""
          this.$emit("donePassword",true)
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
// 排版
#EditPassword {
  .block-area{
    z-index: 999;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
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
      background-color:  #8DDA1E;
      width: -webkit-fill-available;
      text-align: center;
      font-family: Inter;
      font-size: 24px;
      font-weight: 600;
      /* line-height: 24px; */
      letter-spacing: 0em;
      color: white;
      margin-top: 12px;
      border-radius: 14px;
      height: 50px;
    }
  }
}
// 元件
#EditPassword {
  .ant-row{
    margin: 0 !important;
  }
  .content{
    background: black;
    opacity:80%;
    margin: 0px 21px;
    // width: 346px;
    // height: 309px;
    border-radius: 24px;
    padding: 0px 27px;

    .input-font{
      margin: 10px 0;
    height: 50px;
    border-radius: 14px;
    font-size: 20px;
    padding: 0 20px;
    }
  }
}
</style>
