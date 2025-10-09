<template lang="pug">
//- 請填寫功能描述👈
#LoginModal
  .content-area
    .title-content 登入
    aFormModel.form-area(ref="ruleForm", :model="memberForm", :rules="rules")
      aFormModelItem(ref="memberEmail", prop="memberEmail")
        aInput.input-font(
          placeholder="Febe@gmail.com",
          v-model="memberForm.memberEmail"
        ) 
      aFormModelItem(ref="memberPassword", prop="memberPassword")
        aInput.input-font(
          type="password",
          placeholder="aaaa",
          v-model="memberForm.memberPassword"
        )
      aFormModelItem
        aButton.btn-area(type="primary", @click="OnSubmit") {{ "下一步" }}
        aButton.btn-area.btn-forget(type="primary", @click="ForgetPwd") {{ "忘記密碼" }}

</template>

<script>
import { LoginApi } from "@/services/login.js";
export default {
  name: "LoginModal",
  data() {
    return {
      isNotPwd: false,
      memberForm: {
        memberPassword: "",
        memberEmail: "",
      },
      rules: {
        memberPassword: [
          {
            required: true,
            message: "不可為空",
          },
        ],
        memberEmail: [
          { required: true, message: "不可為空" },
          { type: "email", message: "請輸入有效的信箱" },
        ],
      },
    };
  },
  methods: {
    async OnSubmit() {
      const response = await this.GetLoginApi(this.memberForm.memberEmail);

      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          if (response.pwd === this.memberForm.memberPassword) {
            this.memberForm.memberPassword = "";
            this.memberForm.memberEmail = "";
            this.$router.push("/member/profile");
          } else {
            if(response.message==="查無該 email"){
              this.$message.error("此帳號尚未註冊");
            }else this.$message.error("密碼錯誤");

          }
        }
      });
    },
    ForgetPwd(){
      this.$router.push("/member/forgetPwd")
      console.log("sdfhjk")
      
    },


    //API---------------------------
    async GetLoginApi(uemail) {
      const response = await LoginApi(uemail);
      document.cookie = `email=${response.email}`;
      document.cookie = `id=${response.uid}`;
      document.cookie = `uname=${response.uname}`;

      console.log(response)
      return response;
      
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
    // align-items: center;
  }
  @media (min-width: 769px) {
    .content-area {
      align-items: center;
    }
    .form-area {
      width: 600px;
    }
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

  .btn-forget{
    background-color:#C8CCC3 !important;
    margin-top: 5px;
  }
  .input-font {
    height: 45px;
    border-radius: 14px;
    font-size: 20px;
    padding: 0 20px;
  }
  .alert-area {
    z-index: 999;
    position: absolute;
    width: 100vw;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .alert-text {
    width: 169px;
    height: 56px;
    justify-content: flex-start;
    background-color: white;
    border: 1px solid white;
    display: flex;
  }
}
</style>
