<template lang="pug">
//- 修改手機號碼後傳送驗證碼👈
#EditVerificationCode
  .block-area(v-if="visible") 
    .content
      aFormModel.form-area(
        ref="ruleForm"
        :model="memberForm"
        :rules="rules"
        )
        aFormModelItem(ref="verificationCode" prop="verificationCode")
          aInput.input-font(
            placeholder="請輸入簡訊驗證碼"
            v-model="memberForm.verificationCode"
            )
        aFormModelItem
          aButton.btn-area(type="primary" @click="OnSubmit") {{"送出"}}
</template>
  
<script>
export default {
  name: "EditVerificationCode",
  props:{
    visible:{
      type:Boolean,
      default:""
    }
  },
  data () {
    return {
      memberForm:{
        verificationCode: "",
      },
      rules: {
        verificationCode: [
          { required: true,message: "不可為空"},
          // { validator: this.rValidataPhoneFormat, trigger: "blur" }
        ]
      }
    };
  },
  methods:{
    OnSubmit(){
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log(this.memberForm.verificationCode)
          this.memberForm.verificationCode=""
          this.$emit("verifyDone",true)
        }
      })
      
    }
  }
};
</script>

<style lang="scss" scoped>
// 排版
#EditVerificationCode {
  .block-area{
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
    }
  }
}
// 元件
#EditVerificationCode {
  .content{
    background: black;
    opacity: 80%;
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
