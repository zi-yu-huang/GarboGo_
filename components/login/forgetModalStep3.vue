<template lang="pug">
//- 請填寫功能描述👈
#ForgetModalStep3
  .content-area
    .title-content 重設密碼
    aFormModel.form-area(ref="ruleForm", :model="memberForm", :rules="rules")
      aFormModelItem(ref="newPassword", prop="newPassword")
        aInput.input-font(
          type="password",
          placeholder="請輸入密碼",
          v-model="memberForm.newPassword",
          :maxLength="9"
        )
      aFormModelItem(ref="newPasswordAgain", prop="newPasswordAgain")
        aInput.input-font(
          type="password",
          placeholder="請再次輸入確認密碼",
          v-model="memberForm.newPasswordAgain",
          :maxLength="9"
        )
      aFormModelItem
        aButton.btn-area(type="primary", @click="OnSubmit") {{ "確認" }}
</template>

<script>
import { CreateUserApi } from "@/services/editUser.js";
import { LoginApi } from "@/services/login.js";

export default {
  name: "ForgetModalStep3",
  props: {
    memberProfile: {
      type: Object,
      default: "",
    },
  },
  data() {
    return {
      memberForm: {
        newPassword: "",
        newPasswordAgain: "",
      },
      rules: {
        newPassword: [
          { required: true, message: "不可為空" },
          { validator: this.rValidataPhoneFormat, trigger: "blur" },
        ],
        newPasswordAgain: [
          { required: true, message: "不可為空" },
          {
            validator: (rule, value, cbfn) => {
              const form = this.memberForm;
              if (value && value !== form.newPassword) {
                cbfn("兩次密碼不一致!");
              } else {
                cbfn();
              }
            },
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    OnSubmit() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          await this.GetCreateUserApi(this.memberForm);
          this.$emit("DoneStep3", true);
          this.$message.success("成功重設密碼");
          this.memberForm.newPassword = "";
          this.memberForm.newPasswordAgain = "";
        }
      });
    },

    //API --------
    async GetCreateUserApi() {
      const response = await LoginApi(this.memberForm.memberEmail);
      return response;
    },

    async GetCreateUserApi(memberForm) {
      const data = {
        uname: this.memberProfile.uname,
        email: this.memberProfile.email,
        pwd: memberForm.newPassword,
      };
      const response = await CreateUserApi(data);
      return response;
    },
  },
};
</script>

<style lang="scss" scoped>
// 排版
#ForgetModalStep3 {
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
#ForgetModalStep3 {
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
