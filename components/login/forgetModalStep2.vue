<template lang="pug">
//- 請填寫功能描述👈
#ForgetModalStep2
  .content-area
    .title-content 忘記密碼
    aFormModel.form-area(ref="ruleForm", :model="memberForm", :rules="rules")
      aFormModelItem(ref="memberVerify", prop="memberVerify")
        aInput.input-font(
          placeholder="請輸入驗證碼",
          v-model="memberForm.memberVerify",
          :maxLength="9"
        )
      aFormModelItem
        aButton.btn-area(type="primary", @click="OnSubmit") {{ "送出" }}
        .verify-text(@click="OpenModal") {{ "未收到驗證碼?" }}
        .time-area {{ formatCountdownTime() }}


      DemoModal(
        :visible="isVisible",
        @CloseModal="CloseModal",
        @SaveModal="SaveModal"
      )
        template(v-slot:article) {{ "確定要重新寄送驗證碼?" }}
</template>

<script>
import { SendEmailApi,VerifyEmail } from "@/services/sendEmail";
export default {
  name: "ForgetModalStep2",
  components: {
    DemoModal: () => import("@/components/modal/demoModal"),
  },
  props: {
    memberProfile: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      countdown: 0,
      timer: null,
      isVisible: false,

      memberForm: {
        memberVerify: "",
      },
      rules: {
        memberVerify: [
          { required: true, message: "不可為空" },
          { min: 4, message: "驗證碼格式錯誤", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    timeClock() {
      if (this.visible === true && this.tryAgain === null) {
        this.timer = setInterval(this.countdown, 1000);
      }
      if (this.tryAgain === true) {
        this.time = 5;
        this.timer = null;
        this.timer = setInterval(this.countdown, 1000);
        // this.tryAgain=false
      }
    },
  },
  mounted() {
    this.Init();
  },
  methods: {
    async Init() {
      this.startCountdown();
    },
    async OnSubmit() {
      const res = await this.GetVerifyEmail();
      if (res.status === "error") {
        this.$message.error("驗證碼錯誤");
      } else {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.$emit("DoneStep2", true);
          }
        });
      }
    },
    OpenModal() {
      this.isVisible = true;
      this.tryAgain = true;
    },
    countdown() {
      this.min = parseInt(this.time / 60);

      this.sec = this.time % 60;
      this.time--;
      if (this.time < 0) {
        clearInterval(this.timer);
      }
    },
    async SaveModal() {
      this.isVisible = false;
      this.tryAgain = true;
      await this.GetSendEmailApi();
      await this.GetVerifyEmail();
      clearInterval(this.timer);
      this.startCountdown();
      this.formatCountdownTime();
    },
    CloseModal() {
      this.isVisible = false;
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

    //API------------
    async GetVerifyEmail() {
      const data = {
        email: this.memberProfile.email,
        code: this.memberForm.memberVerify,
      };
      const response = await VerifyEmail(data);
      return response.data;
    },
    async GetSendEmailApi() {
      const data = {
        email: this.memberProfile.email,
        uname: this.memberProfile.uname,
      };
      const response = await SendEmailApi(data);

      return response;
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>

<style lang="scss" scoped>
// 排版
#ForgetModalStep2 {
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
#ForgetModalStep2 {
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

  .verify-text {
    color: white;
    text-align: right;
  }
  .time-area {
    font-size: 22px;
    color: white;
  }
}
</style>
