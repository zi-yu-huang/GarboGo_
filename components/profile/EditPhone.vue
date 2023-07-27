<template lang="pug">
//- 修改手機電話👈
#EditPhone
  .block-area(v-if="visible")
    .content
      aFormModel.form-area(
        ref="ruleForm"
        :model="memberForm"
        :rules="rules"
        )
        aFormModelItem(ref="memberPhone" prop="memberPhone")
          aInput.input-font(
            placeholder="請輸入新手機號碼"
            v-model="memberForm.memberPhone"
            :maxLength="9"
            )
        aFormModelItem
          aButton.btn-area(type="primary" @click="OnSubmit") {{"接收驗證碼 "}}
</template>

<script>
export default {
  name: "EditPhone",
  props:{
    visible:{
      type:Boolean,
      default:""
    }
  },
  data () {
    return {

      memberForm:{
        memberPhone: "",
      },
      rules: {
        memberPhone: [
          { required: true,message: "不可為空"},
          { min: 9, message: "手機號碼格式錯誤", trigger: "blur" },
          // { validator: this.rValidataPhoneFormat, trigger: "blur" }
        ]
      }
    };
  },
  methods:{
    OnSubmit(){
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log(this.memberForm.memberPhone)
          this.memberForm.memberPhone=""
          this.$emit("getVerify",true)
        }
      })
    },
  }
};
</script>

<style lang="scss" scoped>
// 排版
#EditPhone {
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
#EditPhone {
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
    height: 50px;
    border-radius: 14px;
    font-size: 20px;
    padding: 0 20px;

  }
  }
}
</style>
