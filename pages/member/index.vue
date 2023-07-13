<template lang="pug">
//- 請填寫頁面👈
#MemberIndex
  MenuList
  .article
    img(src="~/static/PENUP_20230623_161116.png", alt="logo")
    .btn-area
      aButton.btn-text(type="default" value="large") {{"我是會員"}}
      aButton.btn-text(type="default" value="large") {{"我還不是會員"}}

  MenuFooter
</template>

<script>
import debounce from "lodash/debounce";
export default {
  components:{
    MenuList:()=>import("@/components/footer/menuList"),
    MenuFooter:()=>import("@/components/footer/MenuFooter")
  },
  name: "MemberIndex",
  layout: "private",
  data () {
    return {};
  },
  mounted () {
    this.MountedActivated();
  },
  activated () {
    this.MountedActivated();
  },
  deactivated () {
    this.DeactivatedDestory();
  },
  beforeDestroy () {
    this.DeactivatedDestory();
  },
  methods: {
    MountedActivated: debounce(function () {
      // init
    }, 10),
    DeactivatedDestory () {
      // destory
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
    height: 100vh;
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
}
</style>
