<template lang="pug">
//- 修改密碼👈
#EditPassword
  .block-area(v-if="visible")
    .content
      aFormModel.form-area(ref="ruleForm", :model="memberForm", :rules="rules")
        aFormModelItem(ref="oldPassword", prop="oldPassword")
          aInput.input-font(
            type="password",
            placeholder="請輸入原密碼",
            v-model="memberForm.oldPassword",
            :maxLength="9"
          )
        aFormModelItem(ref="newPassword", prop="newPassword")
          aInput.input-font(
            type="password",
            placeholder="請輸入新密碼",
            v-model="memberForm.newPassword",
            :maxLength="9"
          )
        aFormModelItem(ref="newPasswordAgain", prop="newPasswordAgain")
          aInput.input-font(
            type="password",
            placeholder="請再次輸入新密碼",
            v-model="memberForm.newPasswordAgain",
            :maxLength="9"
          )
        aFormModelItem
          aButton.btn-area(type="primary", @click="OnSubmit") {{ "確認 " }}
</template>

<script>
import { LoginApi } from "@/services/login.js";
import { EditUserApi } from "@/services/editUser.js";

export default {
  name: "EditPassword",
  props: {
    visible: {
      type: Boolean,
      default: "",
    },
  },
  data() {
    return {
      dataPwd: "",
      dataUname: "",
      dataEmail: "",
      memberForm: {
        oldPassword: "",
        newPassword: "",
        newPasswordAgain: "",
      },
      rules: {
        oldPassword: [
          { required: true, message: "不可為空" },
          { validator: this.rValidataPhoneFormat, trigger: "blur" },
        ],
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
  mounted() {
    this.Init();
  },
  methods: {
    async Init() {
      await this.GetUserPwdApi();
    },
    OnSubmit() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (this.dataPwd === this.memberForm.oldPassword) {
          if (valid) {
            await this.GetEditUserPwdApi();
            this.$emit("donePassword", true);
          }
        } else {
          this.$message.error("密碼錯誤");
        }
      });
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

    //API ------------
    async GetUserPwdApi() {
      const email = this.GetCookieValue("email");
      const response = await LoginApi(email);
      this.dataPwd = response.pwd;
      this.dataUname = response.uname;
      this.dataEmail = response.email;
    },
    async GetEditUserPwdApi() {
      const response = await EditUserApi(
        this.dataUname,
        this.dataEmail,
        this.memberForm.newPassword
      );
      if (response.data.status === "success") {
        this.$message.success("修改成功");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
// 排版
#EditPassword {
  .block-area {
    z-index: 999;
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
  .content {
    text-align: center;
    justify-content: center;
    .form-area {
      display: flex;
      flex-direction: column;
      height: 309px;
      justify-content: center;
    }
    .btn-area {
      width: -webkit-fill-available;
      text-align: center;
      background-color: #8dda1e;
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
  }
}
// 元件
#EditPassword {
  .ant-row {
    margin: 0 !important;
  }
  .content {
    background: black;
    // opacity:80%;
    margin: 0px 21px;
    // width: 346px;
    // height: 309px;
    border-radius: 24px;
    padding: 0px 27px;

    .input-font {
      margin: 10px 0;
      height: 50px;
      border-radius: 14px;
      font-size: 20px;
      padding: 0 20px;
    }
  }
  @media (min-width: 769px) {
    .block-area{
          align-items: center;

    }
    .content{
      width:600px
    }
  }
}
</style>
