<template lang="pug">
//- 請填寫功能描述👈
#NotCloseAlert
  .alert-mask
    .alert-modal(@click="CloseAlert")
      .alert-modal-2
        .title-area
          .title-font {{titleText}}
          .title-font(v-if=`this.status==='notClose'`) {{"並鎖上垃圾桶"}}
        .content-font 點我關閉警示
</template>

<script>
export default {
  name: "NotCloseAlert",
  props:{
    status:{
      type:String,
      default:""
    }
  },
  data() {
    return {};
  },
  computed:{
    titleText(){
      if(this.status==='notClose'){
        return '請確實關閉'
      }
      else return "已成功關閉垃圾桶"
    }
    
  },
  methods:{
    CloseAlert(){
      this.$emit("CloseAlert")
      console.log(this.status)
      
    }
  }
};
</script>

<style lang="scss" scoped>
// 排版
#NotCloseAlert {
  .alert-mask {
    background-color: rgba(214, 214, 214, 0.85);
    position: fixed;
    width: 100%;
    top: 0;
    height:  100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1002;
  }
  .alert-modal {
    background-color: rgba(0, 0, 0, 0.85);
    width: 250px;
    height: 170px;
    position: fixed;
    border-radius: 10px;
    color: white;
    padding: 20px 10px 0px 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    animation: blink 1s infinite;
    &::before,
    &::after{
      content: '';
      position: absolute;
      width: 10px;
      height: 10px;
      background-color: #D9D9D9;
      border-radius: 50%;
    }

    &::before {
      top: 10px;
      left: 10px;
    }

    &::after {
      top: 10px;
      right: 10px;
    }

  }
  .alert-modal-2{

    &::before,
    &::after{
      content: '';
      position: absolute;
      width: 10px;
      height: 10px;
      background-color: #D9D9D9;
      border-radius: 50%;
    }

    &::before {
      bottom: 10px;
      left: 10px;
    }

    &::after {
      bottom: 10px;
      right: 10px;
    }
  }
  .title-font {
    font-family: Inter;
    font-size: 24px;
    font-weight: 700;
    line-height: 33px;
    letter-spacing: 0em;
    text-align: center;
  }
  .title-area {
    margin-bottom: 23px;
  }
  .content-font {
    font-family: Inter;
    font-size: 13px;
    font-weight: 700;
    line-height: 33px;
    letter-spacing: 0em;
    text-align: center;
  }
  @keyframes blink {
    0% {
      opacity: 1;
    }
    50% {
      // opacity: 0.7;
      background-color: #d00000;
      // background-color: rgba(74, 86, 96, 0.95);
    }
    100% {
      opacity: 1;
    }
  }
}
// 元件
#NotCloseAlert {
}
</style>
