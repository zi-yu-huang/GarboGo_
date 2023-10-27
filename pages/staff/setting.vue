<template lang="pug">
//- 請填寫頁面👈
#StaffSetting
  .background
    .article
      div.title-size {{"設定"}}
      .setting-area
        .setting-content
          .text-area {{"垃圾桶滿溢警告"}}
          aSwitch.text-area
          .text-area {{"行徑路線變更通知"}}
          aSwitch.text-area
</template>

<script>
import debounce from "lodash/debounce";
export default {
  layout:'staff',
  components:{
  },
  name: "StaffSetting",
  data () {
    return {};
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
// 排版
#StaffSetting {
  background-color: rgba(170, 216, 105, 0.8);
  .article{
    padding:40px 30px 80px 30px;
    // height: 100vh;
    text-align: center;
    display: flex;
    flex-direction: column;
    .setting-area{
      height: fill;
      background-color: white;
      margin: 30px 0px;
      width: 100%;
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
#StaffSetting {
  .title-size{
    font-family: Inter;
    font-size: 35px;
    font-weight: 800;
    line-height: 42px;
    letter-spacing: 0em;
  }
  .text-area{
    margin: 9px 0px;
  }
  .ant-switch {
    background-color: rgba(255, 217, 217, 0.77) !important;
    border: 1px solid black;
  }
  .ant-switch-checked {
    background-color:rgba(230, 255, 194, 0.59) !important;/* 開關開啟時的底色 */
  }
  .ant-switch-checked::after {
    background-color: #8DDA1E !important; /* 開關滑塊開啟時的icon顏色 */
  }
  .ant-switch::after {
    background-color: #E70000 ; /* 開關滑塊關閉時的icon顏色 */
  }
}
</style>
