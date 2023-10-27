<template lang="pug">
//- 請填寫功能描述👈
#StaffLoginModal
  .content-area
    .title-content 登入
    aFormModel.form-area(ref="ruleForm", :model="memberForm", :rules="rules")
      aFormModelItem(ref="memberEmail", prop="memberEmail")
        aInput.input-font(
          placeholder="abcd@gmail.com",
          v-model="memberForm.memberEmail"
        ) 
      aFormModelItem(ref="memberPassword", prop="memberPassword")
        aInput.input-font(
          type="password",
          placeholder="請輸入密碼",
          v-model="memberForm.memberPassword",
          :maxLength="9"
        )
      aFormModelItem
        aButton.btn-area(type="primary", @click="OnSubmit") {{ "下一步" }}
</template>

<script>
import { LoginApi } from "../../services/login";
export default {
  name: "StaffLoginModal",
  data() {
    return {
      memberForm: {
        memberPassword: "8S5D1",
        memberEmail: "kevin0008@gmail.com",
      },
      rules: {
        memberPassword: [{ required: true, message: "不可為空" }],
        memberEmail: [
          { required: true, message: "不可為空" },
          { type: "email", message: "請輸入有效的信箱" },
        ],
      },
    };
  },
  methods: {
    async OnSubmit() {
      const pwd = await this.GetLoginApi(this.memberForm.memberEmail);
      console.log(pwd)
      
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (pwd == this.memberForm.memberPassword) {
            console.log("sucess");
            this.memberForm.memberPassword = "";
            this.memberForm.memberEmail = "";
            this.$router.push("/staff/profile");
          }else {
            this.$message.error("密碼錯誤");
          }
        }
      });
    },

    //API-------
    async GetLoginApi(uemail) {
      const response = await LoginApi(uemail);
      document.cookie = `email=${response.email}`;
      document.cookie = `id=${response.uid}`;
      return response.pwd;
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
  .input-font {
    height: 45px;
    border-radius: 14px;
    font-size: 20px;
    padding: 0 20px;
  }
}
</style>
