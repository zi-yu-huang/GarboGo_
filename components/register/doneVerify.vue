<template lang="pug">
//-完成驗證👈
#DoneVerify
  .content-area 
    .article 
        div {{ "-已成功註冊GarboGo-"}}
        div {{ "恭喜您! 終於可以丟垃圾了!" }}
    aButton.btn-area(type="primary" @click="ToMap") {{ "回地圖" }}
</template>

<script>
export default {
  name: "DoneVerify",
  data () {
    return {};
  },
  methods:{
    ToMap(){
      this.$router.push('/')
    }
  }
};
</script>

<style lang="scss" scoped>
// 排版
#DoneVerify {
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
    .article{
      width: 600px;
    }
    .btn-area{
      width: 600px !important;
    }
  }
}
// 元件
#DoneVerify {
  .article{
    background-color: white;
    padding: 35px 21px;
    border-radius: 14px;
    font-size: 20px;
  }
  .btn-area {
    background-color: #241f1f;
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
</style>
