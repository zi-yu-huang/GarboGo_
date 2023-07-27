<template lang="pug">
//- 請填寫頁面👈
#FavoriteIndex
  .article
    div.title-size {{"我的最愛"}}
    .setting-area
      //- .setting-content
      TrashList
</template>

<script>
import debounce from "lodash/debounce";
export default {
  layout:'default',
  components:{
    TrashList:()=>import('@/components/trashList/trashFavoriteList')

  },
  name: "FavoriteIndex",
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
#FavoriteIndex {
  background-color: rgba(170, 216, 105, 0.8);
  // min-height: 100vh;
  // max-height: -webkit-fill-available;
  
  .article{
    padding:40px 30px 90px 30px;
    text-align: center;
    display: flex;
    flex-direction: column;
    .setting-area{
      // min-height: -webkit-fill-available;
      height: fill;
      // max-height: -webkit-fill-available;
      // margin-bottom: 99px;
      // overflow-y: scroll;
      background-color: white;
      margin-top: 30px;
      border-radius: 15px;
      .setting-content{
        padding: 50px 40px;
        font-family: Inter;
        font-size: 20px;
        font-weight: 500;
        line-height: 24px;
        letter-spacing: 0em;
        text-align: left;

        display: grid;
        grid-template-columns: 1fr 0fr;
  
      }
    }
  }
}
// 元件
#FavoriteIndex {
  .title-size{
    font-family: Inter;
    font-size: 35px;
    font-weight: 800;
    line-height: 42px;
    letter-spacing: 0em;
  }
}
</style>
