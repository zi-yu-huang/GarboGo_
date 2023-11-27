<template lang="pug">
//- 請填寫頁面👈
#CollectIndex
  .article
    .title-size {{ "印花集章" }}
  .tab-article
    aTabs.tabs-area(v-model="activeKey", type="card", @change="callback")
      aTabPane.tab1-block(key="1", tab="集章紀錄")
        .calendar-area
          div(v-for="item of dateList")
            CA(
              :selectedDate="item.title",
              :dateList="item.list",
              :isShowChange="item.isShowChange",
              @ChangeTab="ChangeTab"
            )
      aTabPane(key="2", tab="兌換卷")
        div(v-for="index of this.totalT1")
          .point-area
            PointCard(:value="`卷`")
        div(v-for="index of this.totalT0")
          .point-area
            PointCard(:value="`包`")
  Loading(v-if="loadingVisible")
</template>

<script>
import { UserTotalPointApi, TicketNumApi } from "@/services/point";
export default {
  layout: "default",
  components: {
    CollectTable: () => import("@/components/collect/collectTable"),
    PointCard: () => import("@/components/collect/pointCard"),
    CA: () => import("@/components/collect/ca"),
    Loading: () => import("@/components/modal/loadingModal.vue"),
  },
  name: "CollectIndex",
  data() {
    return {
      point: 0,
      card: 0,
      uid: "",
      totalT0: "", //t0:包,t1:卷
      totalT1: "",
      dateList: [],
      lastPoint: 0,
      exchange_ticket: 0,
      userPointList: [],
      activeKey: "1",
      loadingVisible: false,
    };
  },
  mounted() {
    this.Init();
  },
  methods: {
    async Init() {
      this.uid = this.GetCookieValue("id");
      this.loadingVisible = true;
      await this.GetUserTotalPointApi(this.uid);
      this.loadingVisible = false;
      await this.GetTicketNumApi(this.uid);
    },
    callback(key) {
      console.log(key, this.activeKey);
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

    getYears(value) {
      const year = this.value.year();
      const years = [];
      for (let i = year - 10; i < year + 10; i += 1) {
        years.push(i);
      }
      return years;
    },
    getMonths(value) {
      const localeData = this.value.localeData();
      const months = [];
      for (let i = 0; i < 12; i++) {
        months.push(localeData.monthsShort(this.value.month(i)));
      }
      return months;
    },
    onPanelChange(value, mode) {
      // console.log(value, mode);
    },
    ChangeTab() {
      this.totalT1 += 1;
      this.activeKey = "2";
    },

    //API-----
    async GetUserTotalPointApi(id) {
      console.log(id);

      const response = await UserTotalPointApi(id);
      this.dateList = response.data[0].dateList;
      console.log(response.data[0].dateList);
    },
    async GetTicketNumApi(uid) {
      const response = await TicketNumApi(uid);
      console.log(response.data.t0);
      // this.totalT0 = response.t0;
      // this.totalT1 = response.t1;
      this.totalT0 = response.data.t0;
      this.totalT1 = response.data.t1;
      console.log(this.totalT0);
    },
  },
};
</script>

<style lang="scss" scoped>
// 排版
#CollectIndex {
  background-color: rgba(170, 216, 105, 0.8);
  height: 90vh;
  height: fill;
  .article {
    padding: 40px 0px 0px 0px;
    text-align: center;
    display: flex;
    flex-direction: column;
  }
  .tab-article {
    text-align: justify;
    height: 100vh;
    // background-color: #a1cd7b;
  }
  .tabs-area {
    margin-top: 20px !important;
  }
  .tab1-block {
    width: 100% !important;
    background-color: #a1cd7b;

    .tab1-area {
      font-family: Inter;
      font-size: 18px;
      font-weight: 500;
      line-height: 22px;
      letter-spacing: 0em;
      text-align: left;
    }
  }
  .point-area {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
// 元件
#CollectIndex {
  .title-size {
    font-family: Inter;
    font-size: 35px;
    font-weight: 800;
    line-height: 42px;
    letter-spacing: 0em;
  }
  // .calendar-area {
  //   background-color: white;
  // }
  @media (min-width: 769px) {
    .table-area {
      width: 400px;
    }
    .article {
      padding: 40px 30px 120px 30px;
    }
    .article_area {
      display: grid;
      grid-gap: 20px;
      gap: 20px;
      grid-template-columns: 450px 450px 450px;
      justify-items: center;
      justify-content: center;
    }
  }
  .cal-area {
    margin: 20px 20px;
    border-radius: 10px;
  }
}
::v-deep .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab-active {
  height: 60px;
  margin: 1px 1px;
  color: black;
  background: #a1cd7b;
  border-color: #a1cd7b;
  box-shadow: 1px 2px 5px 0px;
}
::v-deep .ant-fullcalendar-selected-day .ant-fullcalendar-value,
.ant-fullcalendar-month-panel-selected-cell .ant-fullcalendar-value {
  color: rgba(0, 0, 0, 0.65);
  background: white;
}

::v-deep .ant-tabs .ant-tabs-top-content,
.ant-tabs .ant-tabs-bottom-content {
  margin-bottom: 110px;
  background-color: #a1cd7b;
}

::v-deep .ant-tabs-bar {
  margin: 0px 0px !important;
}

::v-deep .ant-tabs-tab {
  width: 100%;
}
</style>
