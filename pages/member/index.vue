<template lang="pug">
//- 登入頁面
#MemberIndex
  .article
    img(src="~/static/PENUP_20230623_161116.png", alt="logo")
    .btn-area
      aButton.btn-text(type="default" value="large" @click="MemberLogin") {{"我是會員"}}
      aButton.btn-text(type="default" value="large" @click="MemberRegister") {{"我還不是會員"}}

</template>

<script>
export default {
  layout:'default',
  components:{
  },
  name: "MemberIndex",
  data () {
    return {};
  },
  methods: {
    MemberLogin(){
      this.$router.push("member/login")
    },
    MemberRegister(){
      this.$router.push("member/register")
    }
  }
};
</script>

<style lang="scss" scoped>
// 排版
#MemberIndex {
  img {
    background-color: white;
    width: 125px;
    height: 125px;
    border-radius: 100%;
    padding: 10px;
    text-align: center;
    margin-bottom: 35px;
  }
  .article{
    padding: 150px 80px;
    justify-content: flex-start;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .btn-area{
    display: grid;
    gap: 15px;
    justify-content: center;
  }
}
// 元件
#MemberIndex {
  .btn-text{
    padding-block: 20px;
    font-family: Inter;
    font-size: 22px;
    font-weight: 800;
    line-height: 27px;
    width: 200px;
    display: flex;
    letter-spacing: 0em;
    text-align: center;
    align-items: center;
    justify-content: center;
    border-radius: 25px;
    
  }
  @media (min-width: 769px) {
    .btn-area{
      display: flex;
    }
    .btn-text{
      height: 100px;
    }
  }
}
</style>
