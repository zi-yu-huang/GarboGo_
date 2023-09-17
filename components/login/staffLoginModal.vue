<template lang="pug">
//- 請填寫功能描述👈
#StaffLoginModal
  .content-area
    .title-content 登入
    aFormModel.form-area(ref="ruleForm", :model="memberForm", :rules="rules")
      aFormModelItem(ref="memberEmail", prop="memberEmail")
        aInput.input-font(
            placeholder="abcd@gmail.com",
            v-model="memberForm.memberEmail",
        )      
      aFormModelItem(ref="memberPassword", prop="memberPassword")
        aInput.input-font(
            type="password"
            placeholder="請輸入密碼",
            v-model="memberForm.memberPassword",
            :maxLength="9"
        )
      aFormModelItem
        aButton.btn-area(type="primary", @click="OnSubmit") {{ "下一步" }}
</template>

<script>
export default {
  name: "StaffLoginModal",
  data () {
    return {
      memberForm: {
        memberPassword: "",
        memberEmail: "",
      },
      rules: {
        memberPassword: [{ required: true, message: "不可為空" }],
        memberEmail: [
          { required: true, message: "不可為空" },
          {type: 'email',message: '請輸入有效的信箱'}
        ],
      },
    };
  },
  methods: {
    OnSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.memberForm.memberPassword = "";
          this.memberForm.memberEmail = "";
          this.$router.push('/staff/profile')
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
// 排版
#StaffLoginModal {
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
#StaffLoginModal {
  .title-content {
    color: white;
    font-size: 35px;
    font-family: Inter;
    font-weight: 800;
    line-height: 42px;
    letter-spacing: 0em;
    margin-bottom: 50px;
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
    border-radius: 14px;
    height: 45px;
  }
  .input-font{
    height: 45px;
    border-radius: 14px;
    font-size: 20px;
    padding: 0 20px;
}
}
</style>
