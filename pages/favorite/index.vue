<template lang="pug">
//- 請填寫頁面👈
#FavoriteIndex
  .article
    .title-size {{ "我的最愛" }}
    .setting-area
      //- .setting-content
      TrashList
</template>

<script>
import debounce from "lodash/debounce";
export default {
  layout: "default",
  components: {
    TrashList: () => import("@/components/trashList/trashFavoriteList"),
  },
  name: "FavoriteIndex",
  data() {
    return {};
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
#FavoriteIndex {
  background-color: rgba(170, 216, 105, 0.8);
  // min-height: 100vh;
  // max-height: -webkit-fill-available;

  .article {
    //TODO
    height: 100vh;
    padding: 40px 30px 90px 30px;
    text-align: center;
    display: flex;
    flex-direction: column;
    .setting-area {
      // min-height: -webkit-fill-available;
      height: fill;
      // max-height: -webkit-fill-available;
      // margin-bottom: 99px;
      overflow-y: scroll;
      background-color: white;
      margin-top: 30px;
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
  @media (min-width: 769px) {
    display: flex;
    justify-content: center;
    .article {
      height: 100vh;
      padding: 40px 30px 120px 30px;
      width: 900px;
    }
  }
}
// 元件
#FavoriteIndex {
  .title-size {
    font-family: Inter;
    font-size: 35px;
    font-weight: 800;
    line-height: 42px;
    letter-spacing: 0em;
  }
}
::-webkit-scrollbar {
  width: 7px;
}

// ::-webkit-scrollbar-button {
//   border-radius: 4px;
// }
// ::-webkit-scrollbar-button {
//   box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.3), 0px -5px 5px rgba(0, 0, 0, 0.3); /* 上下间距 */
//   background: transparent;
// background: blue;
// border-radius: 4px;
// }

// ::-webkit-scrollbar-track-piece {
//   background: transparent;
// }

// ::-webkit-scrollbar-thumb {
//   border-radius: 4px;

//   background-color: rgba(0, 0, 0, 0.4);

//   border: 1px solid slategrey;
// }

// ::-webkit-scrollbar-track {
//   box-shadow: transparent;
// }
</style>
