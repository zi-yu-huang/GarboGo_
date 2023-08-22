<template lang="pug">
//- 請填寫功能描述👈
#ProfileInput
  aFormModel.form-area(ref="ruleForm", :model="memberForm", :rules="rules")
  .form-grid
    .member-text {{ "姓名：" }}
    aFormModelItem(ref="memberName", prop="memberName")
      aInput.input-font(
        @change="EditName",
        :disabled="notEdit",
        v-model="memberForm.memberName",
        :maxLength="9"
      )
    .member-text {{ "信箱：" }}
    aFormModelItem(ref="memberEmail", prop="memberEmail")
      aInput.input-font(
        @click="EditPhone",
        :disabled="notEdit",
        v-model="memberForm.memberEmail",
        :maxLength="9",
        readOnly
      )
    .member-text {{ "密碼：" }}
    aFormModelItem(ref="memberPassword", prop="memberPassword")
      aInput.input-font(
        @click="EditPassword",
        type="password",
        :disabled="notEdit",
        v-model="memberForm.memberPassword",
        :maxLength="9",
        readOnly
      )
  aFormModelItem
    aButton.btn-area(v-if="notEdit", type="primary", @click="LogOut") {{ "登出" }}
      aIcon(type="export")
</template>

<script>
import { LoginApi } from "@/services/login.js";

export default {
  name: "ProfileInput",
  props: {
    notEdit: {
      type: Boolean,
      default: "",
    },
  },
  data() {
    return {
      // notEdit:true,
      memberForm: {
        memberName: "",
        memberEmail: "",
        memberPassword: "",
      },
      rules: {
        memberName: [{ required: true, message: "不可為空" }],
      },
    };
  },
  mounted() {
    this.Init();
  },
  methods: {
    async Init() {
      const userEmail = this.GetCookieValue('email');
      console.log(userEmail);

      const data = await this.GetLoginApi(userEmail);
      console.log(data);
      this.memberForm.memberEmail = data.email;
      this.memberForm.memberName = data.uname;
      this.memberForm.memberPassword = data.pwd;
    },
    EditName() {
      console.log(this.memberForm.memberName);
    },
    LogOut() {
      this.$router.push("/member");
    },
    EditPhone() {
      this.$emit("openPhone", true);
    },
    EditPassword() {
      this.$emit("openPassword", true);
    },

    GetCookieValue(cookieName) {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(`${cookieName}=`)) {
          return decodeURIComponent(cookie.substring(cookieName.length + 1));
        }
      }
      return null; // 如果找不到对应的 Cookie，则返回 null
    },
    //API---------------
    async GetLoginApi(uemail) {
      const response = await LoginApi(uemail);
      return response;
    },
  },
};
</script>

<style lang="scss" scoped>
// 排版
#ProfileInput {
  background-color: rgba(115, 170, 36, 0.8);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-radius: 60px 60px 0 0;
  // width: 75%;
  .form-grid {
    display: grid;
    grid-template-columns: auto 1fr;
    margin-top: 50px;
    font-size: 22px;
    width: 75%;
    gap: 15px;
    align-items: center;
  }
}
// 元件
#ProfileInput {
  .member-text {
    color: white;
  }
  .btn-area {
    background-color: #d4d4d4;
    text-align: center;
    font-size: 17px;
    font-weight: 600;
    color: white;
    margin-top: 20px;
    border-radius: 14px;
    height: 40px;
    width: 100px;
  }

  .input-font {
    height: 45px;
    border-radius: 25px;
    font-size: 20px;
    padding: 0 20px;
  }
  .ant-form-item {
    margin-bottom: 0 !important;
  }
}
</style>
