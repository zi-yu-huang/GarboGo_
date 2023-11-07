<template lang="pug">
//- 請填寫頁面👈
#OpenTrashcan
  .sucess-mask
    .phone-area
      .mic-area
      .phone-text {{ "垃圾桶遙控器" }}
      .btn-area
        .open-btn(@click="OpenBtn" :style="{background:openColor}") {{ "開啟" }}
        .close-btn(@click="CloseBtn"  :style="{background:closeColor}") {{ "關閉" }}
      .icon-area
        img(src="~/static/PENUP_20230623_161116.png", alt="logo")
</template>

<script>
import { OpenTrashApi } from "../../services/openTrash";
export default {
  name: "OpenTrashcan",
  layout: "default",
  data() {
    return {
      openColor:"rgb(134 215 18)",
      closeColor:"rgb(234 207 207)"
    };
  },
  methods: {
    async OpenBtn() {
      this.openColor="rgb(205 231 169)"
      this.closeColor="#e32e2e"
      await this.GetOpenTrashApi("open")
    },
    async CloseBtn() {
      this.openColor="rgb(134 215 18)"
      this.closeColor="rgb(234 207 207)"
      await this.GetOpenTrashApi("close")
    },
    //API--------
    async GetOpenTrashApi(stuts){
      const res = await OpenTrashApi(stuts,0);
      
    }
  },
};
</script>

<style lang="scss" scoped>
// 排版
#OpenTrashcan {
  .sucess-mask {
    z-index: 999;
    width: 100vw;
    height: 90vh;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .phone-area {
    background-color: #d4d4d4;
    width: 90%;
    height: 75%;
    border-radius: 55px;
    display: flex;
    justify-content: flex-start;
    padding: 14px 16px;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
  }
  .mic-area {
    background-color: #ffffff;
    width: 80px;
    border-radius: 20px;
    height: 10px;
  }
  .phone-text {
    font-size: 30px;
    font-weight: 800;
    color: #ffffff;
    padding: 30px 0;
  }
  .btn-area {
    background-color: #ffffff;
    width: 95%;
    height: 65%;
    border-radius: 19px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    .open-btn {
      width: 80%;
      height: 150px;
      // background-color: #8cba4a;
      border-radius: 19px;
      color: #ffffff;
      font-size: 30px;
      /* text-align: center; */
      align-items: center;
      display: flex;

      justify-content: center;
    }
    .close-btn {
      width: 80%;
      height: 150px;
      // background-color: #d4d4d4;
      // background-color: #e32e2e;
      border-radius: 19px;
      color: #ffffff;
      font-size: 30px;
      /* text-align: center; */
      align-items: center;
      display: flex;
      justify-content: center;
    }
  }
  img {
    background-color: white;
    margin-top: 10px;
    width: 75px;
    height: 75px;
    border-radius: 100%;
    padding: 10px;
    text-align: center;
  }
}
// 元件
#OpenTrashcan {
}
</style>
