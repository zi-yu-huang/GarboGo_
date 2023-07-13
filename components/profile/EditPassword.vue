<template lang="pug">
//- 請填寫功能描述👈
#EditPassword
  .content
    aFormModel.form-area(
      ref="ruleForm"
      :model="memberForm"
      :rules="rules"
      )
      aFormModelItem(ref="memberPhone" prop="memberPhone")
        aInput.input-font(
          placeholder="請輸入手機號碼"
          v-model="memberForm.memberPhone"
          :maxLength="9"
          )
      aFormModelItem
        aButton.btn-area(type="primary" @click="OnSubmit") {{"接收驗證碼 "}}
</template>

<script>
export default {
  name: "EditPassword",
  data () {
    return {
      memberForm:{
        memberPhone: "",
      },
      rules: {
        memberPhone: [
          { min: 9, message: "手機號碼格式錯誤", trigger: "blur" },
          { validator: this.rValidataPhoneFormat, trigger: "blur" }
        ]
      }
    };
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
    opacity: 0.5;
    width: 346px;
    height: 309px;
    border-radius: 24px;
    padding: 0px 27px;
    .input-font{
      text-align: center;
    }
  }
}
</style>
