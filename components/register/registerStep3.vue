<template lang="pug">
//- 請填寫功能描述👈
#RegisterStep3
  .content-area
    .title-content 註冊
    aFormModel.form-area(ref="ruleForm", :model="memberForm", :rules="rules")
      aFormModelItem(ref="Password" prop="Password")
        aInput.input-font(
          placeholder="請輸入密碼"
          v-model="memberForm.Password"
          :maxLength="9"
          )
      aFormModelItem(ref="PasswordAgain" prop="PasswordAgain")
        aInput.input-font(
          placeholder="請再次輸入密碼"
          v-model="memberForm.PasswordAgain"
          :maxLength="9"
          )
      aFormModelItem
        Button.btn-area(type="primary", @click="OnSubmit") {{ "下一步 " }}
</template>
    
    <script>
export default {
  name: "RegisterStep3",
  data() {
    return {
      memberForm:{
        Password: "",
        PasswordAgain:""
      },
      rules: {
        Password: [
          { required: true,message: "不可為空"},
          { validator: this.rValidataPhoneFormat, trigger: "blur" }
        ],        
        PasswordAgain: [
          { required: true,message: "不可為空"},
          { validator: (rule, value, cbfn) => {
              const form = this.memberForm;
              if (value && value !== form.Password) {
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
  methods: {
    OnSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          // console.log(this.memberForm.Password);
          this.memberForm.Password = "";
          this.memberForm.PasswordAgain = "";
          this.$emit("DoneStep3", true);
        }
      });
    },
  },
};
</script>
    
    <style lang="scss" scoped>
// 排版
#RegisterStep3 {
  .content-area {
    padding: 50px;
    display: flex;
    flex-direction: column;
    text-align: center;
    height: 70vh;
    justify-content: center;
  }
}
// 元件
#RegisterStep3 {
  .title-content {
    color: white;
    font-size: 35px;
    font-family: Inter;
    font-weight: 800;
    line-height: 42px;
    letter-spacing: 0em;
    margin-bottom: 40px;
  }
  .btn-area {
    background-color: #241f1f;
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
</style>
    