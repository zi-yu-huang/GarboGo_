<template lang="pug">
//- 請填寫頁面👈
#CollectIndex
  .article
    .title-size {{ "印花集章" }}
  .tab-article
    aTabs.tabs-area(type="card", @change="callback")
      aTabPane.tab1-block(key="1", tab="集章紀錄")
        .calendar-area
          div(v-for="item of dateList")
            CA(:selectedDate="item.title", :dateList="item.list",:isShowChange="item.isShowChange")
      aTabPane(key="2", tab="兌換卷")
        .point-area
          PointCard
</template>

<script>
import { PointApi, InsertPointApi, UpdataPointApi } from "@/services/point";
export default {
  layout: "default",
  components: {
    CollectTable: () => import("@/components/collect/collectTable"),
    PointCard: () => import("@/components/collect/pointCard"),
    CA: () => import("@/components/collect/ca"),
  },
  name: "CollectIndex",
  data() {
    return {
      point: 0,
      card: 0,
      dateList: [
        { title: "2023-10", list: ["2023-10-02", "2023-10-05", "2023-10-08"],isShowChange:true },
        { title: "2023-11", list: ["2023-11-04", "2023-11-10", "2023-11-13"],isShowChange:false },
      ],
      lastPoint: 0,
      exchange_ticket: 0,
      userPointList: [],
      userId: null,
    };
  },
  mounted() {
    this.Init();
  },
  methods: {
    async Init() {
      // await this.GetPointApi();
      const id = this.GetCookieValue("id");
      this.userId = parseInt(id);
    },
    callback(key) {
      console.log(key);
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
      console.log(value, mode);
    },
    //API------------------
    // async GetPointApi() {
    //   const response = await PointApi();
    //   this.userPointList = response.data;
    // },
    // async GetInsertPointApi(uid) {
    //   const insert = await InsertPointApi(uid);
    //   if (insert.data.status === "success") {
    //     this.$message.success("兌換成功");
    //     await this.GetUpdatePointApi(uid, -10);
    //     this.$nextTick(() => {
    //       this.Init();
    //     });
    //   }
    // },
    // async GetUpdatePointApi(uid, point) {
    //   const update = await UpdataPointApi(uid, point);
    // },
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
    background-color: #a1cd7b;
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
  .point-area{
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
  .cal-area{
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
  box-shadow: 0px -3px 5px 0px;
}
::v-deep .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab {
  width: 118%;
}
::v-deep .ant-fullcalendar-selected-day .ant-fullcalendar-value, .ant-fullcalendar-month-panel-selected-cell .ant-fullcalendar-value{
  color: rgba(0, 0, 0, 0.65);
  background: white;
}

::v-deep .ant-tabs .ant-tabs-top-content, .ant-tabs .ant-tabs-bottom-content {
  margin-bottom: 110px;
  background-color: #a1cd7b;
}
</style>
