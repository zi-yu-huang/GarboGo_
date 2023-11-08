<template lang="pug">
//- 請填寫頁面👈
#SettingIndex
  .background
    .article
      .title-size {{ "關於我們" }}
      .setting-area
        .title-content
          div {{ "GarboGo" }}
        .text-content
          div {{ "指導老師：" }}
          div {{ "周殷菀" }}
          div {{ "組員名單：" }}
          div {{ "陳宣宇" }}
          div {{ "" }}
          div {{ "黃子瑜" }}
          div {{ "" }}
          div {{ "劉靜緹" }}
          div {{ "" }}
          div {{ "戴彣昕" }}
        .detail-content
          div {{ "專題簡介" }}
          div {{ "GarboGo以提高垃圾管理效率和環境衛生水平追目標，此系統通過感應器和網頁技術提供垃圾桶狀態的即時監測和通知服務，為社區居民提供更便捷的垃圾處理方式。" }}
        .slogan-content 
          div {{ "垃圾隨心丟，無需快走跑" }}
          div.width-area {{ "Dump the trash, No more dash." }}
</template>

<script>
export default {
  layout: "default",
  components: {},
  name: "SettingIndex",
  data() {
    return {};
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
// 排版
#SettingIndex {
  background-color: rgba(170, 216, 105, 0.8);
  .article {
    //TODO
    // height: 85vh;
    padding: 40px 30px 80px 30px;
    // height: 100vh;
    text-align: center;
    display: flex;
    flex-direction: column;
    .setting-area {
      height: fill;
      background-color: white;
      margin: 30px 0px;
      width: 100%;
      border-radius: 15px;
      padding: 18px 30px;
      .title-content {
        font-family: Inter;
        font-size: 24px;
        font-weight: 700;
        line-height: 35px;
        letter-spacing: 0em;
        margin-bottom: 14px;
        text-align: center;
      }
      .text-content {
        display: grid;
        grid-template-columns: 100px 100px;
        font-family: Inter;
        font-size: 20px;
        font-weight: 500;
        line-height: 30px;
        letter-spacing: 0em;
        justify-content: left;
      }
      .detail-content {
        font-family: Inter;
        font-size: 19px;
        font-weight: 500;
        line-height: 30px;
        letter-spacing: 0em;
        text-align: left;
        margin-top: 5px;
      }
      .slogan-content {
        font-family: Inter;
        font-size: 20px;
        font-weight: 700;
        line-height: 35px;
        letter-spacing: 0em;
        text-align: center;
        margin-top: 20px;
        color: rgba(82, 140, 0, 1);

        .width-area{
          font-size: 18px;

                  // width: max-content;

        }
      }
    }
  }
}
// 元件
#SettingIndex {
  .title-size {
    font-family: Inter;
    font-size: 35px;
    font-weight: 800;
    line-height: 42px;
    letter-spacing: 0em;
  }
  .ant-switch {
    background-color: rgba(255, 217, 217, 0.77) !important;
    border: 1px solid black;
  }
  .ant-switch-checked {
    background-color: rgba(
      230,
      255,
      194,
      0.59
    ) !important; /* 開關開啟時的底色 */
  }
  .ant-switch-checked::after {
    background-color: #8dda1e !important; /* 開關滑塊開啟時的icon顏色 */
  }
  .ant-switch::after {
    background-color: #e70000; /* 開關滑塊關閉時的icon顏色 */
  }
}
</style>
