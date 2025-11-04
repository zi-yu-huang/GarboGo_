<template lang="pug">
//- 請填寫功能描述👈
#ForgetModalStep1
  .content-area
    .title-content 忘記密碼
    aFormModel.form-area(ref="ruleForm", :model="memberForm", :rules="rules")
      aFormModelItem(ref="memberEmail", prop="memberEmail")
        aInput.input-font(
          placeholder="abcd@gmail.com",
          v-model="memberForm.memberEmail"
        )
      aFormModelItem
        aButton.btn-area(type="primary", @click="OnSubmit") {{ "發送驗證碼" }}
  Loading(v-if="loadingVisible")
</template>

<script>
import { SendEmailApi } from "@/services/sendEmail";
import { LoginApi } from "@/services/login.js";

export default {
  name: "ForgetModalStep1",
  components: {
    Loading: () => import("@/components/modal/loadingModal.vue"),
  },
  data() {
    return {
      loadingVisible: false,

      memberForm: {
        memberEmail: "",
      },
      memberName: "",
      rules: {
        memberEmail: [
          { required: true, message: "不可為空" },
          { type: "email", message: "請輸入有效的信箱" },
        ],
      },
    };
  },
  methods: {
    async OnSubmit() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          this.loadingVisible = true;
          const data = await this.GetCreateUserApi();
          if (data.status === "error") {
            this.$message.error("此帳號尚未註冊");
          } else {
            const otp = await this.GetSendEmailApi(this.memberForm.memberEmail);
            const otpId = otp.data.message;
            console.log(otpId);

            this.$emit("DoneStep1", data, otpId);
          }
          this.loadingVisible = false;
          this.memberForm.memberEmail = "";
        }
      });
    },

    //API ------------------------
    async GetCreateUserApi() {

      const response = await LoginApi(this.memberForm.memberEmail);
      const memberName = response.uname;

      return response;
    },
    async GetSendEmailApi() {
      const data = {
        email: this.memberForm.memberEmail,
        uname: this.memberName,
      };
      const response = await SendEmailApi(data);

      return response;
    },
  },
};
</script>

<style lang="scss" scoped>
// 排版
#ForgetModalStep1 {
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
#ForgetModalStep1 {
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

  .btn-forget {
    background-color: #c8ccc3 !important;
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
