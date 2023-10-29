<template lang="pug">
//- 請填寫頁面👈
#SettingIndex
  .background
    .article
      .title-size {{ "設定" }}
      .setting-area
        .setting-content
          .text-area {{ "垃圾桶清空通知" }}
          aSwitch.text-area(v-model="CleanAlert", @change="OnChangeClean")
          .text-area {{ "垃圾車到點通知" }}
          aSwitch.text-area(v-model="ArriveAlert", @change="OnChangeArrive")
</template>

<script>
import debounce from "lodash/debounce";
import { SettingApi } from "../../services/setting";
import { LoginApi } from "../../services/login";
export default {
  layout: "default",
  components: {},
  name: "SettingIndex",
  data() {
    return {
      uemail: "",
      CleanAlert: 0,
      ArriveAlert: 0,
      clean:null,
      arrive:null
    };
  },
  mounted() {
    this.Init();
  },
  methods: {
    async Init() {
      this.uemail = this.GetCookieValue("email");
      const response = await this.GetLoginApi();
      if (response.CleanAlert === 0) {
        this.CleanAlert = false;
      }
      if (response.CleanAlert === 1) {
        this.CleanAlert = true;
      }
      if (response.ArriveAlert === 0) {
        this.ArriveAlert = false;
      }
      if (response.ArriveAlert === 1) {
        this.ArriveAlert = true;
      }
    },
    async OnChangeClean(val) {
      if (val === true) {
        this.clean = 1;
      } else {
        this.clean = 0;
      }
      if (this.ArriveAlert === false) {
        this.arrive = 0;
      }
      if (this.ArriveAlert === true) {
        this.arrive = 1;
      }

      const response = await this.GetSettingApi(this.uemail, this.clean, this.arrive);
    },
    async OnChangeArrive(val) {
      if (val === true) {
        this.arrive = 1;
      } else {
        this.arrive = 0;
      }
      if (this.CleanAlert === false) {
        this.clean = 0;
      }
      if (this.CleanAlert === true) {
        this.clean = 1;
      }

      const response = await this.GetSettingApi(this.uemail, this.clean, this.arrive);
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
    //API-----------
    async GetSettingApi(email, clean, arrive) {
      const response = await SettingApi(email, clean, arrive);
      return response;
    },
    async GetLoginApi() {
      const response = await LoginApi(this.uemail);
      return response;
    },
  },
};
</script>

<style lang="scss" scoped>
// 排版
#SettingIndex {
  background-color: rgba(170, 216, 105, 0.8);
  .article {
    //TODO
    height: 100vh;
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
#SettingIndex {
  .title-size {
    font-family: Inter;
    font-size: 35px;
    font-weight: 800;
    line-height: 42px;
    letter-spacing: 0em;
  }
  .text-area {
    margin: 9px 0px;
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
