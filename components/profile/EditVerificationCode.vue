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
        div {{ timeClock }}
          .timeClock-text {{ min + "’" + sec }}
          //- .timeClock-text {{ time }}
  DemoModal(
    :visible="isVisible",
    @CloseModal="CloseModal",
    @SaveModal="SaveModal"
  )
    template(v-slot:article) {{ "確定要重新寄送驗證碼?" }}
  Loading(:loadingVisible="loadingVisible")
</template>
  
<script>
import { OtpTextApi, SendEmailApi } from "@/services/sendEmail";
export default {
  components: {
    DemoModal: () => import("@/components/modal/demoModal"),
    Loading:()=>import("@/components/modal/loading.vue")
  },
  name: "EditVerificationCode",
  props: {
    visible: {
      type: Boolean,
      default: "",
    },
    getOptId: {
      type: Number,
      default: "",
    },
    getNewEmail:{
      type:String,
      default:""
    }
  },
  data() {
    return {
      loadingVisible:false,
      timer: null,
      time: 60,
      min: "",
      sec: "",
      // uemail:"",
      tryAgain: null,
      isVisible: false,
      otpText:"",
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
  async mounted() {
    // if(this.visible === true){
    //   await this.Init();
    // }
    
  },
  watch:{
    async visible(newValue, oldValue){
      if (newValue === true) {
        await this.Init();
        // console.log(this.getOptId, "fdisj");
      }
    }
  },
  methods: {
    async Init() {
      await this.GetOtpTextApi(this.getOptId);
    },
    OnSubmit() {
      if(this.memberForm.verificationCode === this.otpText ){
        this.loadingVisible=true
        this.$refs.ruleForm.validate(async(valid) => {
          if (valid) {
            // await this.GetSendEmailApi();
            console.log("djsklf")
            
            this.memberForm.verificationCode = "";
            this.$emit("verifyDone", true,this.getNewEmail);
            this.loadingVisible=false
          }
        });
      }
      else this.$message.error("驗證碼錯誤");
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
      this.Init();

    },
    CloseModal() {
      this.isVisible = false;
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


    // API ------------------
    async GetOtpTextApi(otpId) {
      const response = await OtpTextApi(otpId);
      this.otpText = response
    },
    // async GetSendEmailApi(){
    //   console.log(this.getNewEmail)
      
    //   const uemail = this.GetCookieValue("email")
    //   const response = await SendEmailApi(this.getNewEmail);
    //   console.log(response)
      
    //   return response.data.message      

    // }
  },
  beforeDestroy() {
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
