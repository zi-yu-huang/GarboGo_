<template lang="pug">
//- 請填寫頁面👈
#CollectIndex
  .article
    .title-size {{ "印花集章" }}
    .article_area
      div(v-if="lastPoint > 0")
        CollectTable(:point="lastPoint", :isDeal="false")
      .table-area(v-for="(item, index) in card", :key="item.id")
        CollectTable(:point="10", :isDeal="false", @ChangePoint="ChangePoint")
      .table-area(v-for="(item, index) in exchange_ticket", :key="item")
        CollectTable(:point="10", :isDeal="true")
</template>

<script>
import { PointApi, InsertPointApi, UpdataPointApi } from "@/services/point";
import debounce from "lodash/debounce";
export default {
  layout: "default",
  components: {
    CollectTable: () => import("@/components/collect/collectTable"),
  },
  name: "CollectIndex",
  data() {
    return {
      point: 0,
      card: 0,
      lastPoint: 0,
      exchange_ticket: 0,
      userPointList: [],
      userId: null,
    };
  },
  mounted() {
    this.MountedActivated();
    this.Init();
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
    async Init() {
      await this.GetPointApi();
      const id = this.GetCookieValue("id");
      this.userId = parseInt(id);

      this.GetUserPoint();
    },
    CalculateCard() {
      this.card = new Array(Math.floor(this.point / 10)).fill(0);
      this.lastPoint = this.point % 10;
    },

    GetUserPoint() {
      for (const item of this.userPointList) {

        if (item.uid === this.userId) {
          this.exchange_ticket = item.exchange_ticket;
          this.point = item.total_point - item.exchange_ticket * 10;
          this.CalculateCard();
        }
      }
    },
    async ChangePoint() {
      await this.GetInsertPointApi(this.userId);
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
    //API------------------
    async GetPointApi() {
      const response = await PointApi();
      this.userPointList = response.data;
    },
    async GetInsertPointApi(uid) {
      const insert = await InsertPointApi(uid);
      if (insert.data.status === "success") {
        this.$message.success("兌換成功");
        await this.GetUpdatePointApi(uid, -10);
        this.$nextTick(() => {
          this.Init();
        });
      }
    },
    async GetUpdatePointApi(uid, point) {
      const update = await UpdataPointApi(uid, point);
    },
  },
};
</script>

<style lang="scss" scoped>
// 排版
#CollectIndex {
  background-color: rgba(170, 216, 105, 0.8);
  // height: 100vh;
  height: fill;
  .article {
    padding: 40px 30px 90px 30px;
    text-align: center;
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  .table-area {
    margin-top: 20px;
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
}
</style>
