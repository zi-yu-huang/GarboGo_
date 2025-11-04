<template lang="pug">
//- 修改信箱後傳送驗證碼👈
#EditVerificationCode
  .block-area(v-if="visible") 
    |
    .content
      aFormModel.form-area(ref="ruleForm", :model="memberForm", :rules="rules")
        aFormModelItem(ref="verificationCode", prop="verificationCode")
          aInput.input-font(
            placeholder="請輸入郵件驗證碼",
            v-model="memberForm.verificationCode"
          )
        aFormModelItem
          aButton.btn-area(type="primary", @click="OnSubmit") {{ "送出" }}
        .verify-text(@click="OpenModal") {{ "未收到驗證碼?" }}
        .time-area {{ formatCountdownTime() }}

          //- .timeClock-text {{ time }}
  DemoModal(
    :visible="isVisible",
    @CloseModal="CloseModal",
    @SaveModal="SaveModal"
  )
    template(v-slot:article) {{ "確定要重新寄送驗證碼?" }}
  Loading(v-if="loadingVisible")
</template>

<script>
import $ from "jquery";
import { VerifyEmail, SendEmailApi } from "@/services/sendEmail";
import { CreateUserApi } from "@/services/editUser.js";

export default {
  components: {
    DemoModal: () => import("@/components/modal/demoModal"),
    Loading: () => import("@/components/modal/loadingModal.vue"),
  },
  name: "EditVerificationCode",
  props: {
    visible: {
      type: Boolean,
      default: "",
    },
    getNewEmail: {
      type: String,
      default: "",
    },
    memberEmail: {
      type: String,
      default: "",
    },
    memberName: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      loadingVisible: false,
      countdown: 0,
      timer: null,
      // uemail:"",
      tryAgain: null,
      isVisible: false,
      otpText: "",
      memberForm: {
        verificationCode: "",
      },
      rules: {
        verificationCode: [
          { required: true, message: "不可為空" },
          // { validator: this.rValidataPhoneFormat, trigger: "blur" }
        ],
      },
    };
  },
  mounted() {
    $(document).click((event) => {
      if (this.visible === true) {
        const target = $(event.target);
        const menuIcon = $(".content");
        const menuArea = $(".block-area");

        if (!target.closest(menuIcon).length) {
          if (!target.closest(menuArea).length) {

          }
        }
      }
    });
  },
  watch: {
    async visible(newValue, oldValue) {
      if (newValue === true) {
        await this.Init();
      }
    },
  },
  methods: {
    Init() {
      this.startCountdown();
    },
    OnSubmit() {
      this.loadingVisible = true;
      this.$refs.ruleForm.validate(async (valid) => {
        const res = await this.GetVerifyEmail();
        if (res.status === "error") {
          this.$message.error("驗證碼錯誤");
        } else {
          await this.CreateUserApi()
          this.memberForm.verificationCode = "";
          this.$emit("verifyDone", true, this.getNewEmail);
          this.loadingVisible = false;
        }
      });
    },
    OpenModal() {
      this.isVisible = true;
      // this.tryAgain = true;
    },
    CloseVerifyModal() {
      this.memberForm.verificationCode = "";
      this.$emit("CloseVerifyModal");
    },
    async SaveModal() {
      this.isVisible = false;
      this.visible = true;
      // this.tryAgain = true;
      await this.GetSendEmailApi();


      //TODO
      this.$emit("ChangeVerify", this.otpText);
    },
    CloseModal() {
      this.isVisible = false;
      // this.tryAgain = true;
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

    startCountdown() {
      // 设置倒计时秒数，10分钟
      const seconds = 600;

      // 开始倒计时
      this.countdown = seconds;
      this.timer = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--;
        } else {
          // 倒计时结束，清除计时器
          clearInterval(this.timer);
        }
      }, 1000);
    },
    formatCountdownTime() {
      const minutes = Math.floor(this.countdown / 60);
      const seconds = this.countdown % 60;
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    },
    // API ------------------
    async GetVerifyEmail() {
      const data = {
        email: this.memberEmail,
        code: this.memberForm.verificationCode,
      };
      const response = await VerifyEmail(data);
      return response;
    },
    async GetSendEmailApi() {
      const data = {
        email: this.memberEmail,
        uname: this.memberName,
      };
      const response = await SendEmailApi(data);
    },
    async CreateUserApi() {
      const data = {
        id: this.GetCookieValue("id"),
        email: this.getNewEmail,
      };
      const response = await CreateUserApi(data);
    },
  },
  beforeDestroy() {
    // 组件销毁时清除计时器，防止内存泄漏
    clearInterval(this.timer);
  },
};
</script>

<style lang="scss" scoped>
// 排版
#EditVerificationCode {
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
#EditVerificationCode {
  .ant-row {
    margin: 0 !important;
  }
  .content {
    background: black;
    // opacity: 80%;
    margin: 0px 21px;
    // width: 346px;
    // height: 309px;
    border-radius: 24px;
    padding: 0px 27px;
  }
  .verify-text {
    color: white;
    margin-top: 18px;
    text-align: right;
  }
  .timeClock-text {
    color: white;
    text-align: center;
    // margin-top: 10px;
    font-size: 18px;
  }
  .time-area {
    font-size: 22px;
    color: white;
  }
  .input-font {
    padding: 0 20px;
    height: 50px;
    border-radius: 14px;
    font-size: 20px;
  }
  @media (min-width: 769px) {
    .block-area {
      align-items: center;
    }
    .content {
      width: 600px;
    }
  }
}
</style>
