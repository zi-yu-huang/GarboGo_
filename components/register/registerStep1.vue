<template lang="pug">
//- 請填寫功能描述👈
#RegisterStep1
  .content-area
    .title-content 註冊
    aFormModel.form-area(ref="ruleForm", :model="memberForm", :rules="rules")
      aFormModelItem(ref="memberName", prop="memberName")
        aInput.input-font(placeholder="王曉明", v-model="memberForm.memberName")
      aFormModelItem(ref="memberEmail", prop="memberEmail")
        aInput.input-font(
          placeholder="abcd@gmail.com",
          v-model="memberForm.memberEmail"
        )
      aFormModelItem
        aButton.btn-area( type="primary", @click="OnSubmit") {{ "下一步" }}
  Loading(v-if="loadingVisible")
</template>

<script>
import { SendEmailApi } from "@/services/sendEmail";
import { LoginApi } from "@/services/login.js";

export default {
  name: "RegisterStep1",
  components: {
    Loading: () => import("@/components/modal/loadingModal.vue"),
  },
  data() {
    return {
      loadingVisible: false,
      memberForm: {
        memberName: "",
        memberEmail: "",
      },
      rules: {
        memberName: [{ required: true, message: "不可為空" }],
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
          const res = await this.GetCreateUserApi();
          if (res.status === "error") {
            await this.GetSendEmailApi(this.memberForm);
            this.$emit("DoneStep1", true, this.memberForm);
          } else {
            this.$message.error("該 email 已被註冊");
          }
          this.memberForm.memberEmail = "";
          this.memberForm.memberName = "";
          this.loadingVisible = false;
        }
      });
    },

    // API ---------------
    async GetCreateUserApi() {
      const response = await LoginApi(this.memberForm.memberEmail);
      return response;
    },
    async GetSendEmailApi(memberForm) {
      const data = {
        email: memberForm.memberEmail,
        uname: memberForm.memberName,
      };
      const response = await SendEmailApi(data);

      return response;
    },
  },
};
</script>

<style lang="scss" scoped>
// 排版
#RegisterStep1 {
  .content-area {
    padding: 50px;
    display: flex;
    flex-direction: column;
    text-align: center;
    height: 70vh;
    justify-content: center;
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
#RegisterStep1 {
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
