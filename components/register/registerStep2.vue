<template lang="pug">
//- 請填寫功能描述👈
#RegisterStep2
  .content-area
    .title-content 註冊
    aFormModel.form-area(ref="ruleForm", :model="memberForm", :rules="rules")
      aFormModelItem(ref="memberVerify", prop="memberVerify")
        aInput.input-font(
          placeholder="請輸入驗證碼",
          v-model="memberForm.memberVerify",
          :maxLength="9"
        )
      aFormModelItem
        Button.btn-area(type="primary", @click="OnSubmit") {{ "下一步 " }}
</template>

<script>
export default {
  name: "RegisterStep2",
  data () {
  return {
      memberForm:{
      memberVerify: ""
      },
      rules: {
      memberVerify: [
          { required: true,message: "不可為空"},
          { min: 4, message: "驗證碼格式錯誤", trigger: "blur" },
      ]
      }
  };
  },
  methods:{
    OnSubmit(){
      this.$refs.ruleForm.validate((valid) => {
          if (valid) {
          this.memberForm.memberVerify = "";
          this.$emit("DoneStep2",true)
          }
      });
    },
  }
};
</script>

<style lang="scss" scoped>
// 排版
#RegisterStep2 {
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
#RegisterStep2 {
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

  .input-font{
    height: 50px;
    border-radius: 14px;
    font-size: 20px;
    padding: 0 20px;

  }
}
</style>
