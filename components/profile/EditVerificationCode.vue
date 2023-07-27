<template lang="pug">
//- 修改手機號碼後傳送驗證碼👈
#EditVerificationCode
  .block-area(v-if="visible") 
    .content
      aFormModel.form-area(
        ref="ruleForm"
        :model="memberForm"
        :rules="rules"
        )
        aFormModelItem(ref="verificationCode" prop="verificationCode")
          aInput.input-font(
            placeholder="請輸入簡訊驗證碼"
            v-model="memberForm.verificationCode"
            )
        aFormModelItem
          aButton.btn-area(type="primary" @click="OnSubmit") {{"送出"}}
        .verify-text(@click="OpenModal") {{ "未收到驗證碼?" }}
        div {{ timeClock }}
          .timeClock-text {{ min+"’"+sec }}
          //- .timeClock-text {{ time }}
  DemoModal(:visible="isVisible" @CloseModal="CloseModal" @SaveModal="SaveModal")
      template(v-slot:article) {{"確定要重新寄送驗證碼?"}}       

</template>
  
<script>
import { triggerRef } from 'vue';
export default {
  components:{
    DemoModal:()=>import('@/components/modal/demoModal')
  },
  name: "EditVerificationCode",
  props:{
    visible:{
      type:Boolean,
      default:""
    }
  },
  data () {
    return {
      timer: null,
      time: 600,
      min:"",
      sec:"",
      tryAgain:null,
      isVisible:false,
      memberForm:{
        verificationCode: "",
      },
      rules: {
        verificationCode: [
          { required: true,message: "不可為空"},
          // { validator: this.rValidataPhoneFormat, trigger: "blur" }
        ]
      }
    };
  },
  computed:{
    timeClock(){
      
      if(this.visible ===true && this.tryAgain ===null){
        this.timer=setInterval(this.countdown, 1000);
        console.log("null")
        
      }
      if(this.tryAgain ===true){
        this.time=5
        this.timer=null
        this.timer=setInterval(this.countdown, 1000);
        // this.tryAgain=false
      }
      
    }
    
  },
  methods:{
    OnSubmit(){
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log(this.memberForm.verificationCode)
          this.memberForm.verificationCode=""
          this.$emit("verifyDone",true)
        }
      })
    },
    OpenModal(){
      this.isVisible=true
      this.tryAgain=true
    },    
    countdown() {
      this.min = parseInt(this.time / 60)
      
      this.sec = this.time%60
      console.log(this.min, this.sec)
      this.time --;
      console.log(this.time)
      if(this.time<0){
        clearInterval(this.timer)
      }
    },
    SaveModal(){
      this.isVisible= false;
      this.tryAgain = true
    },
    CloseModal(){
      this.isVisible = false
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>

<style lang="scss" scoped>
// 排版
#EditVerificationCode {
  .block-area{
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
  .content{
    text-align: center;
    justify-content: center; 
      .form-area{
        display: flex;
        flex-direction: column;
        height: 309px;
        justify-content: center;
    }
    .btn-area{
      width: -webkit-fill-available;
      text-align: center;
      background-color:  #8DDA1E;
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
  .ant-row{
    margin: 0 !important;
  }
  .content{
    background: black;
    opacity: 80%;
    margin: 0px 21px;
    // width: 346px;
    // height: 309px;
    border-radius: 24px;
    padding: 0px 27px;

  }
  .verify-text{
    color: white;
    text-align: right;
  }
  .timeClock-text {
    color: white;
    text-align: center;
    margin-top: 10px;
    font-size: 18px;
  }

  .input-font{
    padding: 0 20px;
    height: 50px;
    border-radius: 14px;
    font-size: 20px;
  }
}
</style>
