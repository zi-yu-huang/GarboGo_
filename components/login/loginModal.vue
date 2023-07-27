<template lang="pug">
//- 請填寫功能描述👈
#LoginModal
  .content-area
    .title-content 登入
    aFormModel.form-area(ref="ruleForm", :model="memberForm", :rules="rules")
      aFormModelItem(ref="memberPhone", prop="memberPhone")
        aInput.input-font(
            placeholder="0912345678",
            v-model="memberForm.memberPhone",
            :maxLength="9"
        )      
      aFormModelItem(ref="memberPassword", prop="memberPassword")
        aInput.input-font(
            placeholder="王小明",
            v-model="memberForm.memberPassword",
            :maxLength="9"
        )
      aFormModelItem
        aButton.btn-area(type="primary", @click="OnSubmit") {{ "下一步" }}
</template>

<script>
export default {
  name: "LoginModal",
  data () {
    return {
      memberForm: {
        memberPassword: "",
        memberPhone: "",
      },
      rules: {
        memberPassword: [{ required: true, message: "不可為空" }],
        memberPhone: [
          { required: true, message: "不可為空" },
          { min: 9, message: "手機號碼格式錯誤", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    OnSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.memberForm.memberPassword = "";
          this.memberForm.memberPhone = "";
          this.$router.push('/member/profile')
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
// 排版
#LoginModal {
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
#LoginModal {
  .title-content {
    color: white;
    font-size: 35px;
    font-family: Inter;
    font-weight: 800;
    line-height: 42px;
    letter-spacing: 0em;
    margin-bottom: 80px;
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
