<template lang="pug">
//- 請填寫功能描述👈
#RegisterStep2
  .content-area
    .title-content 註冊
    aFormModel.form-area(ref="ruleForm", :model="memberForm", :rules="rules")
      aFormModelItem(ref="memberVerify", prop="memberVerify")
        aInput.input-font(
          placeholder="請輸入驗證碼",
          v-model="memberForm.memberVerify",
          :maxLength="9"
        )
      aFormModelItem
        Button.btn-area(type="primary", @click="OnSubmit") {{ "下一步 " }}
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
import { OtpTextApi, SendEmailApi } from "@/services/sendEmail";

export default {
  components: {
    DemoModal: () => import("@/components/modal/demoModal"),
  },
  props: {
    otpId: {
      type: Number,
      default: "",
    },
    memberEmail:{
      type:String,
      default:""
    }
  },
  name: "RegisterStep2",
  data() {
    return {
      otpText: "",
      countdown: 0,
      timer: null,
      tryAgain: null,
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
    timeClock() {}
  },
  mounted() {
    this.Init();
  },
  methods: {
    async Init() {
      const response = await this.GetOtpTextApi(this.otpId);
      this.otpText = response;
      this.startCountdown()
    },
    OnSubmit() {
      if (this.otpText === this.memberForm.memberVerify) {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.$emit("DoneStep2", true);
          }
        });
      } else {
        this.$message.error("驗證碼錯誤");
      }
    },
    OpenModal() {
      this.isVisible = true;
      this.tryAgain = true;
    },
    async SaveModal() {
      this.isVisible = false;
      this.tryAgain = true;
      await this.GetSendEmailApi();
      const response = await this.GetOtpTextApi(this.otpId);
      this.otpText = response;      
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
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    },

    //API------------
    async GetOtpTextApi(id) {
      const response = await OtpTextApi(id);
      console.log(response)
      
      return response;
    },
    async GetSendEmailApi() {
      console.log(this.memberEmail)
      const response = await SendEmailApi(this.memberEmail);
      console.log(response.data.message)
      
      this.otpId=response.data.message
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
#RegisterStep2 {
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
#RegisterStep2 {
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
    border: 1px solid black;
    border-radius: 14px;
    height: 45px;
  }

  .input-font {
    height: 45px;
    border-radius: 14px;
    font-size: 20px;
    padding: 0 20px;
  }
  .verify-text {
    color: white;
    text-align: right;
  }
  .time-area{
    font-size: 22px;
    color: white;
  }
}
</style>
