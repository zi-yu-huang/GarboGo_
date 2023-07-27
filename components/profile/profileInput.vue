<template lang="pug">
//- 請填寫功能描述👈
#ProfileInput
  aFormModel.form-area(ref="ruleForm", :model="memberForm", :rules="rules")
  .form-grid
    .member-text {{ "姓名：" }}
    aFormModelItem(ref="memberName", prop="memberName")
      aInput.input-font(
        @click="EditName"
        :disabled="notEdit"
        v-model="memberForm.memberName",
        :maxLength="9"
      )
    .member-text {{ "手機：" }}
    aFormModelItem(ref="memberPhone", prop="memberPhone")
      aInput.input-font(
        @click="EditPhone"
        :disabled="notEdit"
        v-model="memberForm.memberPhone",
        :maxLength="9"
      )
    .member-text {{ "密碼：" }}
    aFormModelItem(ref="memberPassword", prop="memberPassword")
      aInput.input-font(
        @click="EditPassword"
        type="password"
        :disabled="notEdit"
        v-model="memberForm.memberPassword",
        :maxLength="9"
      )
  aFormModelItem
    aButton.btn-area(v-if="notEdit" type="primary", @click="LogOut") {{ "登出" }}
      aIcon(type="export")

</template>

<script>
export default {
  name: "ProfileInput",
  props:{
    notEdit:{
      type:Boolean,
      default:""
    }
  },
  data () {
    return {
      // notEdit:true,
      memberForm: {
        memberName: "黃曉明",
        memberPhone: "0912345678",
        memberPassword:"2312321"
      },
      rules: {
        memberName: [{ required: true, message: "不可為空" }],
      }
    };
  },
  methods:{
    EditName(){
      
    },
    LogOut(){
      this.$router.push("/member")
    },
    EditPhone(){
      this.$emit("openPhone",true)
    },
    EditPassword(){
      this.$emit("openPassword",true)
      
    }
  }
};
</script>

<style lang="scss" scoped>
// 排版
#ProfileInput {
  background-color: rgba(115, 170, 36, 0.8);;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-radius: 60px 60px 0 0 ;
  // width: 75%;
  .form-grid{
    display: grid;
    grid-template-columns: auto 1fr;
    margin-top: 65px;
    font-size: 22px;
    width: 75%;
    gap: 15px;
    align-items: center;
  }
}
// 元件
#ProfileInput {
  .member-text{
    color: white;
  }
  .btn-area{
    background-color: #D4D4D4;
    text-align: center;
    font-size: 17px;
    font-weight: 600;
    color: white;
    margin-top: 20px;
    border-radius: 14px;
    height: 40px;
    width: 100px;
  }

  .input-font{
    height: 50px;
    border-radius: 25px;
    font-size: 20px;
    padding: 0 20px;

  }
  .ant-form-item {
    margin-bottom: 0 !important;
  }
}
</style>
