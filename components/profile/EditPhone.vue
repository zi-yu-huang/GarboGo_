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
            placeholder="請輸入手機號碼"
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
      
    }
  }
};
</script>

<style lang="scss" scoped>
// 排版
#EditPhone {
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
#EditPhone {
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
