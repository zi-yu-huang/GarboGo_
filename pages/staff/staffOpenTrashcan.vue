<template lang="pug">
//- 請填寫頁面👈
#StaffOpenTrashcan
  .sucess-mask
    .phone-area
      .mic-area
      .phone-text {{ "垃圾桶遙控器" }}
      .btn-area
        .open-btn(@click="OpenBtn", :style="{ background: openColor }") {{ "開啟" }}
        .close-btn(@click="CloseBtn", :style="{ background: closeColor }") {{ "關閉" }}
      .icon-area
        img(src="~/static/PENUP_20230623_161116.png", alt="logo")
  Loading(v-if="loadingVisible")
  NotCloseAlert(v-if="alert", @CloseAlert="CloseAlert", :status="`notClose`")
  NotCloseAlert(
    v-if="checkAlert",
    @CloseAlert="CloseAlert",
    :status="`isClose`"
  )
</template>
  
  <script>
import { OpenTrashApi } from "../../services/openTrash";
import { AddPointApi } from "../../services/point";
export default {
  components: {
    Loading: () => import("@/components/modal/loadingModal.vue"),
    NotCloseAlert: () => import("@/components/modal/notCloseAlert.vue"),
  },
  name: "StaffOpenTrashcan",
  layout: "staff",
  data() {
    return {
      elapsedTime: 0,
      loadingVisible: false,
      openColor: "rgb(134 215 18)",
      closeColor: "rgb(234 207 207)",
      isOpen: false,
      alert: false,
      checkAlert: false,
      timer: null,
    };
  },
  methods: {
    async OpenBtn() {
      this.isOpen = true;
      this.openColor = "rgb(205 231 169)";
      this.closeColor = "#e32e2e";
      this.loadingVisible = true;
      //BEFIX
      // await this.GetOpenTrashApi("open");
      this.loadingVisible = false;
      if (this.isOpen === true) {
        this.elapsedTime = 0; // Initialize a counter for elapsed time

        this.timer = setInterval(() => {
          this.elapsedTime += 1; // Increment the elapsed time counter every second

          if (this.elapsedTime > 10) {
            clearInterval(this.timer); // Stop the interval when 15 seconds have passed
            //TODO
            this.alert = true;
          }
        }, 1000);
      }
    },
    async CloseBtn() {
      this.elapsedTime = 0;
      this.isOpen = false;
      this.openColor = "rgb(134 215 18)";
      this.closeColor = "rgb(234 207 207)";
      this.loadingVisible = true;
      this.checkAlert = true;
      //BEFIX
      // const response = await this.GetOpenTrashApi("close");
      this.GetAddPointApi();
      this.loadingVisible = false;
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null; // 將 timer 設置為 null，以便 OpenBtn 函數可以重新創建計時器
      }
    },

    GetCookieValue(cookieName) {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(`${cookieName}=`)) {
          return decodeURIComponent(cookie.substring(cookieName.length + 1));
        }
      }
      return null; // 如果找不到对应的 Cookie，则返回 null
    },
    CloseAlert() {
      this.alert = false;
      if ((this.checkAlert === true)) {
        this.checkAlert = false;
      }
    },

    //API--------
    async GetOpenTrashApi(stuts) {
      const res = await OpenTrashApi(stuts, 1);
    },
    async GetAddPointApi() {
      const uid = this.GetCookieValue("id");
      const res = await AddPointApi(uid);

      return res;
    },
  },
};
</script>
  
  <style lang="scss" scoped>
// 排版
#StaffOpenTrashcan {
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
    height: auto;
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
    padding: 20px 0;
  }
  .btn-area {
    background-color: #ffffff;
    width: 95%;
    height: 60%;
    border-radius: 19px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    // gap: 24px;
    .open-btn {
      width: 70%;
      height: 130px;
      // background-color: #8cba4a;
      border-radius: 14px;
      color: #ffffff;
      font-size: 30px;
      /* text-align: center; */
      align-items: center;
      display: flex;
      margin: 10px 0 10px 0;

      justify-content: center;
    }
    .close-btn {
      width: 70%;
      height: 130px;
      // background-color: #d4d4d4;
      // background-color: #e32e2e;
      border-radius: 14px;
      margin: 10px 0 10px 0;

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
    padding: 1px;
    text-align: center;
  }
}
// 元件
#StaffOpenTrashcan {
}
</style>
  