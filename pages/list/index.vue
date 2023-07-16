<template lang="pug">
//- 請填寫頁面👈
#ListIndex
  MenuList
  .article
    .title-size {{ "垃圾桶列表" }}
    .setting-area
      //- .setting-content
      TrashList
  MenuFooter
</template>

<script>
import debounce from "lodash/debounce";
export default {
  components: {
    MenuList: () => import("@/components/footer/menuList"),
    MenuFooter: () => import("@/components/footer/MenuFooter"),
    TrashList:()=>import('@/components/trashList/trashList')
  },
  name: "ListIndex",
  layout: "private",
  data() {
    return {
      
    };
  },
  mounted() {

    this.MountedActivated();
  },
  activated() {
    this.MountedActivated();
  },
  deactivated() {
    this.DeactivatedDestory();
  },
  beforeDestroy() {
    this.DeactivatedDestory();
  },
  methods: {
    MountedActivated: debounce(function () {
      // init
    }, 10),
    DeactivatedDestory() {
      // destory
    },
  },
};
</script>

<style lang="scss" scoped>
// 排版
#ListIndex {
  background-color: rgba(170, 216, 105, 0.8);
  .article {
    padding: 40px 30px 80px 30px;
    height: 100vh;
    text-align: center;
    display: flex;
    flex-direction: column;
    .setting-area {
      background-color: white;
      height: 100vh;
      margin: 30px 0px;
      width: 100%;
      border-radius: 15px;
      .setting-content {
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
#ListIndex {
  .title-size {
    font-family: Inter;
    font-size: 35px;
    font-weight: 800;
    line-height: 42px;
    letter-spacing: 0em;
  }
}
</style>
