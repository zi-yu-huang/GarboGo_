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
      div {{ timeClock }}
          .timeClock-text {{ min+"’"+sec }}

      DemoModal(
        :visible="isVisible",
        @CloseModal="CloseModal",
        @SaveModal="SaveModal"
      )
        template(v-slot:article) {{ "確定要重新寄送驗證碼?" }}
</template>

<script>
export default {
  components: {
    DemoModal: () => import("@/components/modal/demoModal"),
  },
  name: "RegisterStep2",
  data() {
    return {
      timer: null,
      time: 600,
      min: "",
      sec: "",
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
    timeClock() {
      if (this.visible === true && this.tryAgain === null) {
        this.timer = setInterval(this.countdown, 1000);
        console.log("null");
      }
      if (this.tryAgain === true) {
        this.time = 5;
        this.timer = null;
        this.timer = setInterval(this.countdown, 1000);
        // this.tryAgain=false
      }
    },
  },
  methods: {
    OnSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.memberForm.memberVerify = "";
          this.$emit("DoneStep2", true);
        }
      });
    },
    OpenModal() {
      this.isVisible = true;
      this.tryAgain = true;
    },
    countdown() {
      this.min = parseInt(this.time / 60);

      this.sec = this.time % 60;
      console.log(this.min, this.sec);
      this.time--;
      console.log(this.time);
      if (this.time < 0) {
        clearInterval(this.timer);
      }
    },
    SaveModal() {
      this.isVisible = false;
      this.tryAgain = true;
    },
    CloseModal() {
      this.isVisible = false;
    },
  },
  beforeDestroy() {
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
}
</style>
